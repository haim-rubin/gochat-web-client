
import { observable, decorate, action, configure, runInAction } from 'mobx'
import {contactsList} from './contacts'
import { userProfileMock, contactProfileMock } from './profiles'
import { get } from '../util/http'
import WebSocketMapperMiddleware from '../util/WebSocketMapperMiddleware'
import { getQueryURL } from '../util/route'
configure({enforceActions: 'observed'})

const getDirection = (currentUser, UserID) => (
  currentUser.id === UserID
  ? 'sent'
  : 'received'
)

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

class AppState {
  constructor({ WebSocketMapperMiddleware }){
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
    id: '1',
    thumbnail: 'http://emilcarlsson.se/assets/harveyspecter.png'
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

  /* WebSocket part */
  login() {

    this.webSocketMapperMiddleware.login({ token: '123' })
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

decorate(AppState, {
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
    login: action,
    sendTextMessage: action,

    onTappedMessage: action,
})

export default new AppState({ WebSocketMapperMiddleware })