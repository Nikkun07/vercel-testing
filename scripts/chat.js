
//Create Chatroom Class
class Chatroom
{
    constructor(room, username)
    {
        this.room = room;
        this.username = username;
        this.chats = dataBase.collection('chats-collection');
        this.unsub;
    }

    async addChat(message)
    {
        //Format Chat Object
        const now = new Date();
        const chat = 
        {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //Save Chat Document
        const response = await this.chats.add(chat);
        return response;
    }

    getChatMessages(callback)
    {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot =>
            {
                snapshot.docChanges().forEach(change =>
                {
                    if(change.type === 'added')
                    {
                        //Update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateName(username)
    {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(roomName)
    {
        this.room = roomName;
        console.log('Room Updated');

        if(this.unsub)
        {
            this.unsub();
        }
    }
}


/* THIS ARE ALL FOR TESTING THE CHATROOM CLASS PROTOTYPE */

//Initialize chatroom
/* const chatroom = new Chatroom('general', 'Nikkun'); */

//Send Message Test
/* chatroom.addChat(':Osanacry:')
    .then(() => console.log("Chat Added"))
    .catch(err => console.log(err)); */

//Output Chatlogs
/* chatroom.getChatMessages((data) =>
{
    console.log(data);
}); */

//Change Room Test
/* setTimeout(() =>
{  
    chatroom.updateRoom('gaming');
    chatroom.updateName('Nikkun');
    chatroom.getChatMessages((data) =>
    {
        console.log(data)
    });
    //chatroom.addChat('This is a test');
    
}, 5000); */
