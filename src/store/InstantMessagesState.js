
import { observable, decorate, action, configure, runInAction } from 'mobx'
import { userProfileMock, contactProfileMock } from './profiles'
import { get } from '../util/http'
import { getQueryURL } from '../util/route'
configure({enforceActions: 'observed'})

const getDirection = (currentUser, UserID) => {
  return (
    currentUser.UserID === UserID
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
    thumbnail: currentUser.thumbnail,
    content: {
      type: MessageType === 1 && 'text',
      value: Content
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
  currentChat = {
    ChatType: 'p2p',
    ChatID:     '1',
    GroupID:    null,
    ParticipanID: '2',
    UserId:  getQueryURL().uid,
  }
  arrivedMessage = {}
  currentUser = {
    thumbnail: 'http://emilcarlsson.se/assets/harveyspecter.png',
    UserID:  getQueryURL().uid,
  }
  tappedMessage = {}

  increment = function(){
      this.timer ++;
  }

  decreament = function(){
      this.timer--;
  }

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
    this.tappedMessage[this.currentChat.ParticipanID || this.currentChat.GroupID] = value
  }

  onContactClick = (contact) => {
    console.log(`User ${contact.UserID} selected.`)
    this.currentChat.ParticipanID = contact.UserID
  }

  /* WebSocket part */
  registerInstantMessages(token) {

    this.webSocketMapperMiddleware.login(token)
      .then(({ connected }) => {
        if(!connected){
          return
        }
        this.webSocketMapperMiddleware.addEventsListeners({
          onMessage: this.onMessageReceived.bind(this),
          onClose: this.onClose.bind(this),
          onError: this.onError.bind(this),
          onOpen: this.onOpen.bind(this),
        })
      })
      .catch(error => {
        console.error(error)
        console.error('Faild to connect with WS...')
      })
  }
  onMessageReceived(message){
    console.log('MReceived', message)
    runInAction(() =>{
      this.arrivedMessage = message
      this.messages = this.messages.concat(mapMessage(message, this.currentUser))
    })
  }
  onClose(message){

  }

  onError(error){
    console.log('Error received', error)
  }
  onOpen(event){
    console.log('OnOpen', event)
  }

  sendTextMessage(){
    this.webSocketMapperMiddleware.send({
      ...this.currentChat,
      Content: this.tappedMessage[this.currentChat.ParticipanID || this.currentChat.GroupID],
      MessageType: 1,
    })
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
    currentChat: observable,
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
})

export default InstantMessagesState