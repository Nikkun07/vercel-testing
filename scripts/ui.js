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
        );
        
        const html = 
        `
            <li class="list-group-item">
                <span class="thicc-text username">${escapeHtml(data.username)}</span>
                <span class="overflow-hidden message">${escapeHtml(data.message)}</span>
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