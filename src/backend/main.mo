import AccessControl "./authorization/access-control";
import MixinAuthorization "./authorization/MixinAuthorization";
import Time "mo:core/Time";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Types ---
  public type ProductCategory = { #Spices; #Vegetables; #Fruits; #Groceries; #Others };
  public type OrderStatus = { #Pending; #Accepted; #Declined; #Dispatched; #Delivered };

  public type Product = {
    id : Text;
    name : Text;
    category : ProductCategory;
    pricePerKg : Nat;
    stock : Nat;
    wholesalerId : Text;
    wholesalerName : Text;
    wholesalerContact : Text;
  };

  public type CartItem = {
    productId : Text;
    quantity : Nat;
  };

  public type Order = {
    id : Text;
    retailerId : Text;
    retailerName : Text;
    retailerShop : Text;
    items : [CartItem];
    status : OrderStatus;
    createdAt : Int;
  };

  public type UserProfile = {
    id : Text;
    name : Text;
    shopName : Text;
    phone : Text;
    email : Text;
    location : Text;
    role : Text;
  };

  // --- Stable state ---
  var products : [Product] = [];
  var orders : [Order] = [];
  var users : [UserProfile] = [];
  var nextId : Nat = 1;

  func genId() : Text {
    let id = nextId.toText();
    nextId += 1;
    id
  };

  // --- User management ---
  public shared func registerUser(profile : UserProfile) : async Text {
    let id = genId();
    let newUser : UserProfile = {
      id = id;
      name = profile.name;
      shopName = profile.shopName;
      phone = profile.phone;
      email = profile.email;
      location = profile.location;
      role = profile.role;
    };
    users := users.concat([newUser]);
    id
  };

  public query func getUsers() : async [UserProfile] { users };

  // --- Product management ---
  public shared func addProduct(p : Product) : async Text {
    let id = genId();
    let newProduct : Product = {
      id = id;
      name = p.name;
      category = p.category;
      pricePerKg = p.pricePerKg;
      stock = p.stock;
      wholesalerId = p.wholesalerId;
      wholesalerName = p.wholesalerName;
      wholesalerContact = p.wholesalerContact;
    };
    products := products.concat([newProduct]);
    id
  };

  public shared func updateProduct(id : Text, pricePerKg : Nat, stock : Nat) : async Bool {
    products := products.map(func(p : Product) : Product {
      if (p.id == id) {
        { p with pricePerKg; stock }
      } else { p }
    });
    true
  };

  public shared func deleteProduct(id : Text) : async Bool {
    products := products.filter(func(p : Product) : Bool { p.id != id });
    true
  };

  public query func getProducts() : async [Product] { products };

  // --- Order management ---
  public shared func placeOrder(order : Order) : async Text {
    let id = genId();
    let newOrder : Order = {
      id = id;
      retailerId = order.retailerId;
      retailerName = order.retailerName;
      retailerShop = order.retailerShop;
      items = order.items;
      status = #Pending;
      createdAt = Time.now();
    };
    orders := orders.concat([newOrder]);
    id
  };

  public shared func updateOrderStatus(id : Text, status : OrderStatus) : async Bool {
    orders := orders.map(func(o : Order) : Order {
      if (o.id == id) { { o with status } } else { o }
    });
    true
  };

  public query func getOrders() : async [Order] { orders };

  public query func getRetailerOrders(retailerId : Text) : async [Order] {
    orders.filter(func(o : Order) : Bool { o.retailerId == retailerId })
  };
};
