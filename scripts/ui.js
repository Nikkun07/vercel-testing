//render chat templates to the DOM

//clear list of chats after room change


class ChatUI
{
    constructor(list)
    {
        this.list = list;
    }

    render(data)
    {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix:true}
        )
        const html = 
        `
            <li class="list-group-item">
                <span class="thicc-text username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="smolPP-text time">${when}</div>
            </li>
        `;

        this.list.innerHTML += html;
    }

    clear()
    {
        this.list.innerHTML = '';
    }
}