/**
 * @name OpenTextFiles
 * @version 1.0.1
 * @authorLink https://twitter.com/FawkesOficial
 * @website https://twitter.com/FawkesOficial
 * @source https://raw.githubusercontent.com/FawkesOficial/BD-OpenTextFiles/main/OpenTextFiles.plugin.js
 * @updateUrl https://raw.githubusercontent.com/FawkesOficial/BD-OpenTextFiles/main/OpenTextFiles.plugin.js
 */


const https = require('https');

let channelMessages = ZeresPluginLibrary.WebpackModules.find(m => m._channelMessages)._channelMessages;


module.exports = class OpenTextFiles {

    getVersion() { return "1.0.1";}
    getName () {return "OpenTextFiles";}
    getAuthor () {return "Fawkes";}
    getDescription() {return "Plugin for BetterDiscord to open Text Files inside the client.";}

    showText(url, title) {
        https.get(url, (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          resp.on('end', () => {

            BdApi.showConfirmationModal(title, 
                [BdApi.React.createElement("div", {class: "markup-2BOw-j da-markup messageContent-2qWWxC da-messageContent"}, data)],
                {
                    danger: false,
                    confirmText: "Close",
                    cancelText: ""
                }
                );
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
          return err.message
        });
    }


    async start() {console.log("OpenTextFiles started!")}


    observer(changes) {
        let target = changes.target
        
        if (target.className == "chat-3bRxxu da-chat" && Object.keys(changes.addedNodes).length > 0) {
            let currentChannelId = ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId()
            let currentChannelMessages = channelMessages[currentChannelId]._array

            currentChannelMessages.forEach(message => {
                let messageAttachments = message.attachments
                let hasAttachements = Object.keys(messageAttachments).length > 0

                if (hasAttachements) {

                    messageAttachments.forEach(attachment => {
                        let filename = attachment.filename
                        let file_url = attachment.url
                        let messageId = message.id
                        let isReadable = filename.endsWith(".txt") || filename.endsWith(".js") || filename.endsWith(".json") || filename.endsWith(".py") || filename.endsWith(".html") || filename.endsWith(".css") || filename.endsWith(".md")

                        
                        if (isReadable) {

                            let messagesHtml = document.getElementsByClassName("scrollerInner-2YIMLh da-scrollerInner")[0].children

                            for (let element of messagesHtml) {
                                if (element.id == "chat-messages-"+messageId) {
                                    let downloadButtonHtml = element.children[1].getElementsByClassName("anchor-3Z-8Bb da-anchor anchorUnderlineOnHover-2ESHQB da-anchorUnderlineOnHover downloadWrapper-vhAtLx da-downloadWrapper")[0]
                                    let attachmentHtml = element.children[1].getElementsByClassName("attachment-33OFj0 horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG alignCenter-1dQNNs da-attachment da-horizontal da-flex da-directionRow da-alignCenter embedWrapper-lXpS3L da-embedWrapper")[0]

                                    var OpenTextFilesButton = document.createElement("span");
                                    OpenTextFilesButton.innerHTML = `<button style="background-color: transparent;" type="button" onclick="BdApi.Plugins.get('OpenTextFiles').showText('${file_url}', '${filename}')">
                                    <svg name="Note" width="24" height="24" viewBox="-1 -1.5 23 23" class="icon-GhnIRB da-icon icon-22AiRD">
                                        <g class="">
                                            <path fill="currentColor" d="M 4.618, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 s 0.573 -0.256, 0.573 -0.573 V 0.573 C 5.191, 0.256, 4.935, 0, 4.618, 0 z" class=""></path>
                                            <path fill="currentColor" d="M 8.053, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 s 0.573 -0.256, 0.573 -0.573 V 0.573 C 8.626, 0.256, 8.37, 0, 8.053, 0 z" class=""></path>
                                            <path fill="currentColor" d="M 11.489, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 c 0.316, 0, 0.573 -0.256, 0.573 -0.573 V 0.573 C 12.061, 0.256, 11.805, 0, 11.489, 0 z " class=""></path>
                                            <path fill="currentColor" d="M 14.924, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 c 0.316, 0, 0.573 -0.256, 0.573 -0.573 V 0.573 C 15.496, 0.256, 15.24, 0, 14.924, 0 z" class=""></path>
                                            <path fill="currentColor" d="M 16.641, 1.25 V 1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 V 1.25 C 2.236, 1.488, 1.756, 2.117, 1.756, 2.863 v 14.962 c 0, 0.947, 0.77, 1.718, 1.718, 1.718 h 12.595 c 0.947, 0, 1.718 -0.77, 1.718 -1.718 V 2.863 C 17.786, 2.117, 17.306, 1.488, 16.641, 1.25 z M 14.924, 16.679 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 c 0 -0.316, 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 C 15.496, 16.423, 15.24, 16.679, 14.924, 16.679 z M 14.924, 13.244 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 c 0 -0.316, 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 C 15.496, 12.988, 15.24, 13.244, 14.924, 13.244 z M 14.924, 9.733 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 s 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 S 15.24, 9.733, 14.924, 9.733 z M 14.924, 6.298 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 s 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 S 15.24, 6.298, 14.924, 6.298 z" class=""></path>
                                        </g>
                                    </svg>
                                    </button>`;

                                    if (Object.keys(attachmentHtml.getElementsByTagName("span")).length > 0) {} else {
                                        attachmentHtml.insertBefore(OpenTextFilesButton, downloadButtonHtml)
                                    }
                                }
                            }
                        }


                    });
                }
            });
        }

        if ( target.className == "scrollerInner-2YIMLh da-scrollerInner") {
            let currentChannelId = ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId()
            let currentChannelMessages = channelMessages[currentChannelId]._array

            currentChannelMessages.forEach(message => {
                let messageAttachments = message.attachments
                let hasAttachements = Object.keys(messageAttachments).length > 0

                if (hasAttachements) {

                    messageAttachments.forEach(attachment => {
                        let filename = attachment.filename
                        let file_url = attachment.url
                        let messageId = message.id
                        let isReadable = filename.endsWith(".txt") || filename.endsWith(".js") || filename.endsWith(".json") || filename.endsWith(".py") || filename.endsWith(".html") || filename.endsWith(".css") || filename.endsWith(".md")
                        
                        if (isReadable) {

                            let messagesHtml = document.getElementsByClassName("scrollerInner-2YIMLh da-scrollerInner")[0].children

                            for (let element of messagesHtml) {
                                if (element.id == "chat-messages-"+messageId) {
                                    let downloadButtonHtml = element.children[1].getElementsByClassName("anchor-3Z-8Bb da-anchor anchorUnderlineOnHover-2ESHQB da-anchorUnderlineOnHover downloadWrapper-vhAtLx da-downloadWrapper")[0]
                                    let attachmentHtml = element.children[1].getElementsByClassName("attachment-33OFj0 horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG alignCenter-1dQNNs da-attachment da-horizontal da-flex da-directionRow da-alignCenter embedWrapper-lXpS3L da-embedWrapper")[0]

                                    var OpenTextFilesButton = document.createElement("span");
                                    OpenTextFilesButton.innerHTML = `<button style="background-color: transparent;" type="button" onclick="BdApi.Plugins.get('OpenTextFiles').showText('${file_url}', '${filename}')">
                                    <svg name="Note" width="24" height="24" viewBox="-1 -1.5 23 23" class="icon-GhnIRB da-icon icon-22AiRD">
                                        <g class="">
                                            <path fill="currentColor" d="M 4.618, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 s 0.573 -0.256, 0.573 -0.573 V 0.573 C 5.191, 0.256, 4.935, 0, 4.618, 0 z" class=""></path>
                                            <path fill="currentColor" d="M 8.053, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 s 0.573 -0.256, 0.573 -0.573 V 0.573 C 8.626, 0.256, 8.37, 0, 8.053, 0 z" class=""></path>
                                            <path fill="currentColor" d="M 11.489, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 c 0.316, 0, 0.573 -0.256, 0.573 -0.573 V 0.573 C 12.061, 0.256, 11.805, 0, 11.489, 0 z " class=""></path>
                                            <path fill="currentColor" d="M 14.924, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 c 0.316, 0, 0.573 -0.256, 0.573 -0.573 V 0.573 C 15.496, 0.256, 15.24, 0, 14.924, 0 z" class=""></path>
                                            <path fill="currentColor" d="M 16.641, 1.25 V 1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 V 1.25 C 2.236, 1.488, 1.756, 2.117, 1.756, 2.863 v 14.962 c 0, 0.947, 0.77, 1.718, 1.718, 1.718 h 12.595 c 0.947, 0, 1.718 -0.77, 1.718 -1.718 V 2.863 C 17.786, 2.117, 17.306, 1.488, 16.641, 1.25 z M 14.924, 16.679 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 c 0 -0.316, 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 C 15.496, 16.423, 15.24, 16.679, 14.924, 16.679 z M 14.924, 13.244 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 c 0 -0.316, 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 C 15.496, 12.988, 15.24, 13.244, 14.924, 13.244 z M 14.924, 9.733 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 s 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 S 15.24, 9.733, 14.924, 9.733 z M 14.924, 6.298 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 s 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 S 15.24, 6.298, 14.924, 6.298 z" class=""></path>
                                        </g>
                                    </svg>
                                    </button>`;

                                    if (Object.keys(attachmentHtml.getElementsByTagName("span")).length > 0) {} else {
                                        attachmentHtml.insertBefore(OpenTextFilesButton, downloadButtonHtml)
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    stop () {}
}