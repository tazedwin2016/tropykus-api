import {
    App,
    initializeApp,
    applicationDefault,
} from 'firebase-admin/app'

let app: App

try {

    app = initializeApp({
        credential: applicationDefault()
    })
    
} catch (error) {
    console.error(error)
    process.exit(1)
}

export default app
