
import { observable, decorate, action, configure, runInAction } from 'mobx'
import { userProfileMock, contactProfileMock } from './profiles'
import { get } from '../util/http'
import { getQueryURL } from '../util/route'
import { Message, Group } from './entities'
configure({enforceActions: 'observed'})

const getDirection = (currentUser, UserID) => {
  return (
    currentUser.ID === UserID
    ? 'sent'
    : 'received'
  )
}

const mapMessage = (message, currentUser) => {
  const {
    // ChatID,
    // ChatType,
    Content,
   // GroupID,
    MessageType, // text / image / video / ...
   // ParticipanID,
    UserID,
  } = message
  const mappedMessage = {
    direction: getDirection(currentUser, UserID),
    thumbnail: currentUser.Thumbnail,
    content: {
      type: MessageType === 1 && 'text',
      value: Content.text
    }
  }

  return mappedMessage
}

class InstantMessagesState {
  constructor({ WebSocketMapperMiddleware, rootState }){
    this.rootState = rootState
    this.webSocketMapperMiddleware = new WebSocketMapperMiddleware({ url:  `ws://${document.location.host}/ws` })
  }

  messages = []
  contacts = []
  userProfile = {}
  openUserStatusOptions = false
  openUserContactInfo = false
  timer = 0

  arrivedMessage = {}
  currentGroup = new Group({ ID: 1, Nickname: 'Familya', GroupType: 2 })

  tappedMessage = {}

  containerRef = {}

  fetchMessages = () => {
    return (
      get({url: '/api/messages'})
        .then(imMessages => imMessages.concat(imMessages))
    )
  }

  sendActivationCode({ email }){
    return (
      get({url: `api/verification/code?username=${email}`})
        .then(data => {
          console.log(data)
        })
    )
  }

  getMessages = () => {
    this.fetchMessages()
      .then(messages =>{
          runInAction(() =>{
              this.messages = messages
          })
          this.rootState.scrollToBottom()
      })
  }

  fetchContacts = (page) => {

    return (
      get({url: `/api/contacts?uid=${getQueryURL().uid}`})
        .then(contacts => contacts)
    )
  }

  getContacts = (page) => {
    this.fetchContacts()
      .then(contacts =>{
          runInAction(() =>{
              this.contacts = contacts
          })
      })
  }

  fetchUserProfile = (page) => {
    return new Promise((resolve, reject) =>{
      setTimeout(() => resolve(userProfileMock), 200)
    })
  }

  getUserProfile = (page) => {
    this.fetchUserProfile()
      .then(userProfile =>{
          runInAction(() =>{
              this.userProfile = userProfile
          })
          this.rootState.scrollToBottom()
      })
  }

  fetchContactProfile = (page) => {
      return new Promise((resolve, reject) =>{
          setTimeout(() => resolve(contactProfileMock), 200)
      })
  }

  getContactProfile = (page) => {
      this.fetchContactProfile()
          .then(contactProfile =>{
              runInAction(() =>{
                  this.contactProfile = contactProfile
              })
          })
  }

  toggleUserStatusOptions = () => {
    runInAction(() =>{
      this.openUserStatusOptions = !this.openUserStatusOptions
    })
  }
  toggleUserContactInfo = () => {
    runInAction(() =>{
      this.openUserContactInfo = !this.openUserContactInfo
    })
  }

  onTappedMessage = (value) =>{
    this.tappedMessage[this.currentGroup.ID] = value
  }

  onContactClick = (contact) => {
    console.log(`User ${contact.UserID} selected.`)
    this.currentGroup.ID = contact.GroupID
    this.setCurrentChat(contact)
  }

  setCurrentChat = (currentGroup) => {
    this.currentGroup = currentGroup
    //TODO: load the relevant messages
    this.rootState.scrollToBottom()
  }

  parseReceivedMessage = ({ Content, ...message }) => {
    return {
      ...message,
      Content: typeof Content === 'string'? JSON.parse(Content) : Content
    }
  }

  /* WebSocket part */
  registerInstantMessages = (token) => {

    this.webSocketMapperMiddleware.login(token)
      .then(({ connected }) => {
        if(!connected){
          return
        }
        this.webSocketMapperMiddleware.addEventsListeners({
          onMessage: (message) => this.onMessageReceived(this.parseReceivedMessage(message)),
          onClose: this.onClose,
          onError: this.onError,
          onOpen: this.onOpen,
        })
      })
      .catch(error => {
        console.error(error)
        console.error('Faild to connect with WS...')
      })
  }

  onMessageReceived(message){
    console.log('MReceived', message)
    let scroll
    runInAction(() =>{
      scroll = this.rootState.shouldScroll()
      this.arrivedMessage = message.Content
      this.messages = this.messages.concat(mapMessage(message, this.rootState.activation.userInfo))
    })

    scroll && this.rootState.scrollToBottom()

  }
  onClose(message){

  }

  onError(error){
    console.log('Error received', error)
  }
  onOpen(event){
    console.log('OnOpen', event)
  }

  getMessageInstance = () => {
    return (
      new Message({
        SenderUserID: this.rootState.activation.userInfo.ID,
        GroupID: this.currentGroup.ID,
        //ToUserID: '', //Case its replay
        MessageType: 1,
        Content: JSON.stringify({ text: this.tappedMessage[this.currentGroup.ID] }),
      })
    )
  }

  sendTextMessage(){
    this.webSocketMapperMiddleware.send(this.getMessageInstance())
    this.onTappedMessage('')
  }



}

decorate(InstantMessagesState, {
    messages: observable,
    contacts: observable,
    userProfile: observable,
    contactProfile: observable,
    openUserStatusOptions: observable,
    openUserContactInfo: observable,
    timer: observable,
    currentGroup: observable,
    arrivedMessage: observable,
    onMessageReceived: observable,
    tappedMessage: observable,


    /* Actions */
    getMessages: action,
    getContacts: action,
    getUserProfile: action,
    getContactProfile: action,
    toggleUserStatusOptions: action,
    toggleUserContactInfo: action,
    registerInstantMessages: action,
    sendTextMessage: action,

    onTappedMessage: action,
    onContactClick: action,
    setCurrentChat: action,
})

export default InstantMessagesState