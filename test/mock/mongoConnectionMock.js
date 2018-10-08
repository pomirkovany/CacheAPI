class MongoConnectionMock {

    constructor() {
        let deleteOneCalled = false;
        let updateOneCallCount = 0;
        this.mongoMethodsMock = {
            estimatedDocumentCount: function () {
                return Promise.resolve(5);
            },
            findOneAndUpdate({key}) {
                return key === "test1" ? Promise.resolve({ value: { item: "dummy1"} }) : Promise.resolve({ value: null });
            },
            insertOne() {
                return Promise.resolve();
            },
            updateOne() {
                const result = {updatedExisting: updateOneCallCount > 0 ? true : false };
                updateOneCallCount++;
                return Promise.resolve(result);
            },
            find() {
                return {
                    toArray: function () {
                        return Promise.resolve([
                            {
                                "_id": "5bb9fbe7799415a9b4206b74",
                                "key": "test1",
                                "item": "0sdli",
                                "createdAt": new Date("2018-10-07T12:28:23.752Z")
                            },
                            {
                                "_id": "5bb9fbe9799415a9b4206b75",
                                "key": "test2",
                                "item": "7h9da",
                                "createdAt": new Date("2018-10-07T12:28:25.727Z")
                            },
                            {
                                "_id": "5bb9fbeb799415a9b4206b76",
                                "key": "test3",
                                "item": "oms9a",
                                "createdAt": new Date("2018-10-07T12:28:27.945Z")
                            }]
                        )
                    }
                }
            },
            deleteOne() {
                const deletedCount = deleteOneCalled ? 1 : 0;
                deleteOneCalled = true;
                return Promise.resolve( { deletedCount })
            },
            deleteMany() {
                return Promise.resolve( { deletedCount:3 });
            }
        }
    }
    db () {
        const mockCollection = {
            collection: () => {
                return this.mongoMethodsMock;
            }
        }
        mockCollection.collection.bind(this);
        return mockCollection;
    }
}

module.exports = MongoConnectionMock;