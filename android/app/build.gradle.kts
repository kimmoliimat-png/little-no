plugins {
    id("com.android.application")
}

android {
    namespace = "game.littleno.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "game.littleno.app"
        minSdk = 24
        targetSdk = 36
        versionCode = 2
        versionName = "1.0.1"
    }

    signingConfigs {
        create("release") {
            val store = rootProject.file("keystore/upload-keystore.jks")
            if (store.exists()) {
                storeFile = store
                storePassword = System.getenv("LITTLE_NO_STORE_PASSWORD") ?: ""
                keyAlias = "upload"
                keyPassword = System.getenv("LITTLE_NO_KEY_PASSWORD") ?: ""
            }
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            signingConfig = signingConfigs.findByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
