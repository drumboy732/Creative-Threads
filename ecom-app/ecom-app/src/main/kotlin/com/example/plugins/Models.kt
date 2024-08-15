package com.example.plugins

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId
import java.util.StringJoiner

@Serializable
data class Product(
    val id: Int,
    val name: String,
    val images: String,
    val price: Int,
)

@Serializable
data class Fabric(
    val id: Int,
    val name: String,
    val images: String,
    val price: Int,
)

@Serializable
data class User(
    val name: String,
    val username: String,
    val email: String,
    val phone: String,
)

@Serializable
data class Credentials(
    val username: String,
    val password: String,
)

@Serializable
data class CustomStyle (
    val collar: String,
    val cuff: String,
    val color: String,
    val pocket: String,
)

@Serializable
data class CartItem(
    val productId: Int,
    val customStyle: CustomStyle
)

@Serializable
data class SentCartItem(
    val productId: Int,
    val customStyle: CustomStyle,
    val productInfo: Product
)