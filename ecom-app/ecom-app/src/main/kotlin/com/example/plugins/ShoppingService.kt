package com.example.plugins

import com.mongodb.client.model.Filters
import com.mongodb.client.model.IndexOptions
import com.mongodb.client.model.Indexes
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toCollection
import kotlinx.coroutines.runBlocking

class ShoppingService(mongoClient: MongoClient) {
    private val db = mongoClient.getDatabase("myDb")

    init {
        runBlocking {
            db.createCollection("products")
            db.createCollection("fabrics")
            db.createCollection("credentials")
            db.createCollection("users")
            db.createCollection("cart")
        }
    }

    private val productCollection = db.getCollection("products", Product::class.java)
    private val fabricCollection = db.getCollection("fabrics", Fabric::class.java)
    private val credentialsCollection = db.getCollection("credentials", Credentials::class.java)
    private val usersCollection = db.getCollection("users", User::class.java)
    private val cartCollection = db.getCollection("cart", CartItem::class.java)

    init {
        runBlocking {
            productCollection.createIndex(Indexes.ascending("id"), IndexOptions().unique(true))
            fabricCollection.createIndex(Indexes.ascending("id"), IndexOptions().unique(true))
        }
    }

    suspend fun saveUserInformation(user: User) {
        usersCollection.insertOne(user)
        credentialsCollection.insertOne(Credentials(user.username, user.email))
    }

    suspend fun verifyCredentials(receivedCredentials: Credentials): Boolean {
        val filter = Filters.eq("username", receivedCredentials.username)
        val credentials = credentialsCollection.find(filter).firstOrNull()

        if (credentials == null) {
            return false
        } else if (credentials.password != receivedCredentials.password) {
            return false
        }

        return true
    }

    suspend fun getUserInformation(username: String): User? {
        return usersCollection.find(Filters.eq("username", username)).firstOrNull()
    }

    suspend fun getProducts(): List<Product> {
        return buildList { productCollection.find().toCollection(this) }
    }

    suspend fun getFabrics(): List<Fabric> {
        return buildList { fabricCollection.find().toCollection(this) }
    }


    suspend fun getProductById(id: Int): Product? {
        return productCollection.find(Filters.eq("id", id)).firstOrNull()
    }

    suspend fun getFabricById(id: Int): Fabric? {
        return fabricCollection.find(Filters.eq("id", id)).firstOrNull()
    }

    suspend fun saveToCart(item: CartItem): Long {
        cartCollection.insertOne(item)
        return cartCollection.countDocuments()
    }

    suspend fun retrieveAllFromCart(): List<SentCartItem> {
        val cartItems = buildList { cartCollection.find().toCollection(this) }
        val sentItems = cartItems.map { SentCartItem(it.productId, it.customStyle, getProductById(it.productId)!!)}
        return sentItems
    }

}