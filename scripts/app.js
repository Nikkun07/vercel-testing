//DOM Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//Check Local Storage for Name
const username = localStorage.username ? localStorage.username : 'Anon';


//Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//Update Chat Room
rooms.addEventListener('click', e =>
{
    if(e.target.tagName === 'BUTTON')
    {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChatMessages(chat => chatUI.render(chat));
    };
});


//Add New Chat
newChatForm.addEventListener('submit', e =>
{
    e.preventDefault();
    const msg = newChatForm.message.value.trim();
    chatroom.addChat(msg)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//Update Username
newNameForm.addEventListener('submit', e =>
{
    e.preventDefault();
    //Update Name
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    //Reset Form
    newNameForm.reset();

    //Display/Hide Update Message
    updateMsg.innerText = `Your name is updated to ${newName}.`;
    
    setTimeout(() => updateMsg.innerText = '', 3000);
});


//Get chats and render 
chatroom.getChatMessages(data =>chatUI.render(data));
