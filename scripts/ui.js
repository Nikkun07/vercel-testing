//render chat templates to the DOM

//clear list of chats after room change

function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

class ChatUI
{
    constructor(list)
    {
        this.list = list;
    }

    render(data)
    {
        const when = dateFns.formatDistanceToNowStrict(
            data.created_at.toDate(),
            {addSuffix:true}
        )
        const dataUsername = data.username;
        const dataMessage = data.message;
        const html = 
        `
            <li class="list-group-item">
                <span class="thicc-text username">${escapeHtml(dataUsername)}</span>
                <span class="overflow-hidden message">${escapeHtml(dataMessage)}</span>
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