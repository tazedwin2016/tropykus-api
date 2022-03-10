import { Firestore } from 'firebase-admin/firestore'

const firestore = new Firestore()

export const getDataByCollection = async (collectionName: string) => await firestore.collection(collectionName).get()


export async function batchData<T>(collectionName: string, data: T[], fieldId?: string) {
    
    const batch = firestore.batch()


    type Item = Partial<Record<string, any>>

    data.forEach((i: Item) => {
        const pathDoc = `${collectionName}${fieldId ? '/' + i[fieldId] : ''}`
        let docRef = firestore.doc(pathDoc)

        batch.set(docRef, i, )
    })
    return batch.commit()
}

export const getCollections = async () => {
    const collections = await firestore.listCollections()
    
    return collections.map(c => c.id)
}
