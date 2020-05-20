
import { observable, decorate, action, configure, runInAction } from "mobx"
import {contactsList} from './contacts'
import {imMessages} from './messages'
import { userProfileMock, contactProfileMock } from './profiles'

configure({enforceActions: 'observed'})


class AppState {
  messages = []
  contacts = []
  userProfile = {}
  openUserStatusOptions = false
  openUserContactInfo = false
  timer = 0

  increment = function(){
      this.timer ++;
  }

  decreament = function(){
      this.timer--;
  }

  fetchMessages = () => {
    return new Promise((resolve, reject) =>{
      setTimeout(() => resolve(imMessages.concat(imMessages)), 200)
    })
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
    return new Promise((resolve, reject) =>{
      setTimeout(() => resolve(contactsList.concat(contactsList)), 200)
    })
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
}

decorate(AppState, {
    messages: observable,
    contacts: observable,
    userProfile: observable,
    contactProfile: observable,
    openUserStatusOptions: observable,
    openUserContactInfo: observable,
    timer: observable,
    getMessages: action,
    getContacts: action,
    getUserProfile: action,
    getContactProfile: action,
    toggleUserStatusOptions: action,
    toggleUserContactInfo: action,

})

export default new AppState()