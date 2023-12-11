
class OrderTracker {
     // Приватне статичне instance поле для збереження єдиного екземпляра класу початкове значення null
 static #instance = null;
     // Приватне статичне orders поле для збереження списку замовлень початкове значення []
 static #orders = []; 
//  Статичний метод create використовується для створення єдиного екземпляра класу
 // Перевіряємо, чи є вже створений екземпляр класу
    // Якщо немає, створюємо новий екземпляр
    // Інакше повертаємо єдиний екземпляр класу
 static create(){
    if (!this.#instance){
        this.#instance = new OrderTracker()
    }
    return this.#instance
 }
 /**
     * Статичний метод add використовується для додавання замовлення до списку
     * Отримує item та додає його до масиву замовлень
     */
 static add(item){
    this.#orders.push(item)
 }
  /**
     * Статичний метод get використовується для отримання списку замовлень
     */
 static get(){
    return this.#orders
 }
}  
  console.log("Завдання 1 ====================================");
  // Створюємо єдиний екземпляр класу OrderTracker
  const tracker = OrderTracker.create();  
  // Додаємо замовлення до списку
  OrderTracker.add("Телефон");
  OrderTracker.add("Ноутбук");  
  // Отримуємо список замовлень
  const orders = OrderTracker.get();  
  // Виводимо список замовлень в консоль
  console.log(orders);
  
//=====================================================

// Фабрика (Factory) — це патерн програмування, який надає загальний клас для створення об'єктів, який враховує
// передані аргументи та вирішує який клас повинен мати об’єкт при створенні
// Клас Book описує книгу в магазині
class Book {    
    //   Конструктор Book приймає об'єкт з параметрами
    constructor({title, author, coverColor}){
       this.title = title;//   title - назва книги
       this.author = author;//   author - автор книги
        this.coverColor = coverColor;//   coverColor - колір обкладинки книги
    }
    //    Метод describe генерує опис книги
    describe(){
        return `Книга: ${this.title}, Автор: ${this.author}, Колір обкладинки: ${this.coverColor}`;
    }
    //    Повертає рядок у форматі: "Книга: '{назва}', автор: '{автор}', колір обкладинки: '{колір}'"     
  }
  
  /**
   * Клас AudioBook описує аудіокнигу в магазині
   */
  class AudioBook {
    
    //  Конструктор AudioBook приймає об'єкт з параметрами
    constructor({title, author, audioLength}){
    this.title = title;// title - назва книги
    this.author = author; //author - автор книги
    this.audioLength = audioLength; //audioLength - тривалість аудіокниги 
    }    
        // Метод describe генерує опис аудіокниги
    describe(){
        return `Аудіокнига: ${this.title}, автор: ${this.author}, тривалість: ${this.audioLength}`;
    }
        //  Повертає рядок у форматі: "Аудіокнига: '{назва}', автор: '{автор}', тривалість: '{тривалість}'"
  }
  
  /**
   * Клас ProductFactory використовується для створення об'єктів-продуктів.
   */
  
  class ProductFactory {
    // TYPE - статична властивість, що визначає типи продуктів, які можуть бути створені.
    static TYPE = {
      BOOK: "book",
      AUDIOBOOK: "audiobook",
    }
    /**
     * Статичний метод createProduct використовується для створення об'єктів-продуктів, отримує
     * type - тип продукту, що має бути створений. Має бути одним зі значень властивості TYPE.
     * options - об'єкт з параметрами для конструктора продукту.
     *
     * В залежності від типу, повертає або екземпляр класу Book, або AudioBook.
     *
     *  Кидає помилку, якщо переданий тип не підтримується `Такого типу продукту не існує: ${type}`.
     */
    static createProduct(type, options){
        switch(type){
            case this.TYPE.BOOK:
                return new Book(options);
            case this.TYPE.AUDIOBOOK:
                return new AudioBook(options);
            default:
                throw new Error(`Такого типу продукту не існує: ${type}`) 
        }
    }
  }
  console.log("Завдання 2 ====================================");
//   Використовуємо ProductFactory для створення нової книги
  const factoryBook = ProductFactory.createProduct(ProductFactory.TYPE.BOOK, {
    title: "Назва книги",
    author: "Автор книги",
    coverColor: "Синій",
  });  
//   Виводимо в консоль опис нової книги
  console.log(factoryBook.describe());  
//   Використовуємо ProductFactory для створення нової аудіокниги
  const factoryAudiobook = ProductFactory.createProduct(
    ProductFactory.TYPE.AUDIOBOOK,
    {
      title: "Назва аудіокниги",
      author: "Автор аудіокниги ",
      audioLength: "5 годин",
    }
  );  
//   Виводимо в консоль опис нової аудіокниги
  console.log(factoryAudiobook.describe());
  
//   Спробуємо створити продукт непідтримуваного типу
  try {
    const factoryUnknown = ProductFactory.createProduct("comics", {});
  } catch (error) {
    // Виводимо помилку в консоль
    console.error(error.message);
  }

//============================================

// Спостерігач (Observer) — це патерн програмування, який визначає залежність "один-багато" між об'єктами, так що зміна стану одного об'єкта
// призводить до автоматичного оновлення всіх залежних об'єктів
/**
 * Клас Customer представляє клієнта, що має можливість отримувати повідомлення по електронній пошті.
 * Клієнт ідентифікується своєю електронною адресою, яку використовується для відправки повідомлень.
 */
class Customer {
    /**
     * Конструктор для класу Customer. Приймає email - Електронна адреса клієнта.
     */
    constructor(email){
        this.email = email;
    }
    /**
     * Метод відправки повідомлення клієнту по електронній пошті.Приймає message - повідомлення,та виводить в консоль ${this.email} ${message}.
     */
    sendEmail(message){
        return console.log(`${this.email} ${this.message}`)
    }
  }
  
  /**
   * Клас Product представляє продукт, який можна створювати.
   */
  class Product {
    /**
     * Конструктор для класу Product.Приймає name - Назва продукту.
     */
    constructor(name){
        this.name = name;
    }
  }
  
  /**
   * Клас Store представляє магазин, який може мати підписників і створювати нові продукти.
   * Магазин має назву і список підписників, які отримують повідомлення про нові продукти.
   */
  class Store {
    /**
     * Конструктор для класу Store.Приймає name - Назва магазину, та створює пустий масив customers
     */
    constructor(name){
        this.name = name;
        this.customers = [];
    }
    /**
     * Метод subscribe для підписки клієнта на магазин. Приймає customer - Клієнт, який підписується.
     * Після виклику цього методу, клієнт буде отримувати повідомлення про нові продукти, через push додаємо клієнта до масиву.
     */
    subscribe(customer){
        this.customers.push(customer)
    }
    /**
     * Метод unsubscribe для відписки клієнта від магазину.Приймає customer - Клієнт, який відписується.
     * Після виклику цього методу, клієнт більше не буде отримувати повідомлення про нові продукти, через filter прибираємо клієнта з масиву.
     */
    unsubscribe(customer){
        this.customers = this.customers.filter((custom) => custom !== customer)
    }
    /**
     * Метод createProduct для створення нового продукту в магазині.Приймає name - Назва нового продукту.
     * Після виклику цього методу, новий продукт буде створено, а всі підписники отримають про це повідомлення через sendNotify.
     */
    createProduct(name){
         const product = new Store(name)
         this.sendStore(product)
    }
    /**
     * Метод для відправки повідомлень всім підписникам про новий продукт.Приймає product - Продукт, про який відправляється повідомлення.
     * Новий продукт "${product.name}" в магазині ${this.name}! за допомогою sendEmail.
     */
    // За допомогою forEach перебираємо масив customers
    // Для кожного елементу масиву викликаємо метод sendEmail з рядком `Новий продукт "${product.name}" в магазині ${this.name}!`
    sendStore(product){
        this.customers.forEach(customer => {
            customer.sendEmail(`Новий продукт ${product.name} в магазині ${this.name}!`)
        });
    }
} 
  console.log("Завдання 3 ====================================");
  // Після виконання розкоментуйте код нижче
  
  const store = new Store("IT Supermarket");
  
  const customer1 = new Customer("john@example.com");
  const customer2 = new Customer("jane@example.com");
  const customer3 = new Customer("alice@example.com");
  
  store.subscribe(customer1);
  store.subscribe(customer2);
  store.subscribe(customer3);
  
  store.createProduct("Новий ноутбук");
  
  store.unsubscribe(customer1);
  
  store.createProduct("Бездротові навушники");
  
  //================================================================

  // Декоратор (Decorator) — це патерн програмування, який додає нову функціональність до існуючих об'єктів, не змінюючи їхньої структури.
// Іншими словами, він дозволяє розширити функціональність об'єкта, не змінюючи сам об'єкт.

// Клас Drink представляє основний напій, який можна приготувати.
// Цей клас містить базову вартість напою (price=10) та його ім'я (name="Чай").
class Drink {
    price = 10;
    name = "Чай";
    // Метод prepare() виводить в консоль рядок "Приготування {назва напою}"
    prepare(){
        console.log(`Приготування ${this.name}`)
    }
  }
  
  // Клас HoneyDecorator є декоратором, який додає мед до напою.
  class HoneyDecorator {
    // Конструктор приймає в якості параметрів базовий напій (drink) та кількість меду (amount), яку треба додати.
    constructor(drink, amount){
        this.drink = drink;
        this.amount = amount;
    }
    // Getter для name повертає рядок `${this.drink.name} з ${this.amount} г меду`.
    get name(){
        return `${this.drink.name} з ${this.amount} г меду`
    }
    // Getter для price розраховує загальну вартість напою, враховуючи базову вартість напою
    // і додаткову вартість меду, яку за замовчуванням встановлюємо на 0.5, і множимо на this.amount.
    get price(){
         return this.price + (0.5 * this.amount);
        
    }
    
    // Метод prepare відповідає за приготування напою з медом.
    // Він виводить в консоль Приготування ${this.name} з медом
    prepare() {
        console.log(`Приготування ${this.name} з медом`)
    }
  }
  console.log("Завдання 4 ====================================");
  // Після виконання розкоментуйте код нижче
  
  // Створення об'єкту базового напою (чаю)
  let tea = new Drink();
  console.log(tea.name); // Виводить ім'я напою
  console.log(tea.price); // Виводить вартість напою
  tea.prepare(); // Готує напій
  
  // Додавання декоратора меду до чаю
  let honeyTea = new HoneyDecorator(tea, 2); // Додаємо 2 грами меду
  console.log(honeyTea.name); // Виводить нову назву напою
  console.log(honeyTea.price); // Виводить нову вартість напою
  honeyTea.prepare(); // Готує напій з медом
  
  