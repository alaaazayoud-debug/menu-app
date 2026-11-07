import { appSettings } from '../config/settings'

export class ConfigManager {
  static updateSettings(newSettings) {
    Object.assign(appSettings, newSettings)
    this.saveToLocalStorage()
  }

  static saveToLocalStorage() {
    localStorage.setItem('restaurantConfig', JSON.stringify(appSettings))
  }

  static loadFromLocalStorage() {
    const saved = localStorage.getItem('restaurantConfig')
    if (saved) {
      Object.assign(appSettings, JSON.parse(saved))
    }
    return appSettings
  }

  // توليد رسالة واتساب مخصصة
  static generateWhatsAppMessage(cartItems, total) {
    const { restaurant, orders } = appSettings
    let message = `*${restaurant.name}*%0A`
    message += `*طلب جديد*%0A%0A`

    cartItems.forEach((item) => {
      message += `- ${item.name} x ${item.quantity} - ${item.price * item.quantity} ${orders.currency}%0A`
    })

    message += `%0A*المجموع: ${total} ${orders.currency}*%0A`
    message += `%0A*العنوان:* ${restaurant.location}%0A`
    message += `*الهاتف:* ${restaurant.phone}%0A%0A`
    message += `شكراً لطلبكم من ${restaurant.name}! 🍽️`

    return message
  }
}
