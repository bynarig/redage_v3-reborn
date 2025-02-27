<script>
    import { fly } from 'svelte/transition';
    export const phoneNotification;
    export const isHudNewPhone;

    import Notification from './notification.svelte'
    import Header from './components/header.svelte'

    import { executeClientAsync } from "api/rage";
    let background = ""
    executeClientAsync("phone.settings.wallpaper").then((result) => {
        background = result;
    });

</script>

<div id="newphone" class="notif" in:fly={{ y: 200, duration: 100 }} out:fly={{ y: 200, duration: isHudNewPhone ? 0 : 100 }}>
    <div class="newphone__image">
        {#if phoneNotification}
            <Notification {phoneNotification} />
        {/if}

        <div class="newphone__background over-hiden" style="background-image: url({background})">
            <Header />
        </div>
    </div>
</div>