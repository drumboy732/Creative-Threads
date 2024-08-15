package com.example.plugins

import com.mongodb.kotlin.client.coroutine.MongoClient
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureDatabases() {
    val mongoDatabase = connectToMongoDB()
    val shoppingService = ShoppingService(mongoDatabase)
    routing {
        route("cart") {
            get {
                call.respond(shoppingService.retrieveAllFromCart())
            }

            post {
                System.err.println("IDK IDK IDK")
                val cartItem = runCatching { call.receive<CartItem>() }.getOrNull() ?: return@post call.respond(HttpStatusCode.BadRequest)
                shoppingService.saveToCart(cartItem)
                call.respond(HttpStatusCode.OK)
            }
        }

        route("products") {
            get {
                call.respond(shoppingService.getProducts())
            }

            route("fabrics") {
                get {
                    call.respond(shoppingService.getFabrics())
                }

                get("{id}") {
                    val id = call.parameters["id"] ?: return@get call.respond(HttpStatusCode.BadRequest)
                    val intId = runCatching { id.toInt() }.getOrNull() ?: return@get call.respond(HttpStatusCode.BadRequest)
                    val fabric = shoppingService.getFabricById(intId) ?: return@get call.respond(HttpStatusCode.NotFound)
                    call.respond(fabric)
                }
            }

            get("{id}") {
                val id = call.parameters["id"] ?: return@get call.respond(HttpStatusCode.BadRequest)
                val intId = runCatching { id.toInt() }.getOrNull() ?: return@get call.respond(HttpStatusCode.BadRequest)
                val product = shoppingService.getProductById(intId) ?: return@get call.respond(HttpStatusCode.NotFound)
                call.respond(product)
            }
        }

        route("user") {
            get("profile/{username}") {
                val username = call.parameters["username"] ?: return@get call.respond(HttpStatusCode.BadRequest)
                val userInfo = shoppingService.getUserInformation(username) ?: return@get call.respond(HttpStatusCode.NotFound)
               call.respond(userInfo)
            }

            post("register") {
                val receivedUser = runCatching { call.receive<User>() }.getOrNull() ?: return@post call.respond(HttpStatusCode.BadRequest)
                shoppingService.saveUserInformation(receivedUser)
                call.respond(HttpStatusCode.Created)
            }

            post("login") {
                val receivedCredentials = runCatching {  call.receive<Credentials>() }.getOrNull() ?: return@post call.respond(HttpStatusCode.BadRequest)
                val isLoginValid = shoppingService.verifyCredentials(receivedCredentials)
                if (isLoginValid) {
                    val userInformation = shoppingService.getUserInformation(receivedCredentials.username) ?: return@post call.respond(HttpStatusCode.InternalServerError)
                    call.respond(HttpStatusCode.OK, userInformation)
                } else {
                    call.respond(HttpStatusCode.Unauthorized)
                }
            }
        }
    }
}

fun connectToMongoDB(): MongoClient {
    return MongoClient.create("mongodb://127.0.0.1:27017/")
}
