<script>
    import './main.sass';
    export const placeholder;
    export const type;
    export const icon;
    export const setValue;
    export const value;
    export const isFocus = false;
    export const updateLang;
    export const settingsClass;
    export const settingsMargin;
    import { isInput } from '@/views/player/newauthentication/store.js';

    let TextInput;

    $: {
        if (isFocus) {
            TextInput.focus();
        }
    }

    const OnClick = () => {
        TextInput.focus();
    }

    let focusInput = false;

    const onFuncFocus = () => {
        focusInput = true;
        isInput.set(true);
    }

    const onFuncBlur = () => {
        focusInput = false;
        isInput.set(false);
    }

    const enLower = 'abcdefghijklmnopqrstuvwxyz'
    const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

    $: if (updateLang && focusInput && value && value.length) {
        if (enLower.indexOf (value [value.length - 1].toLowerCase()) !== -1) 
            updateLang ("en")
        else if (rusLower.indexOf (value [value.length - 1].toLowerCase()) !== -1) 
            updateLang ("ru")
    }

</script>

<div class="main__input" on:click={OnClick} class:hover={focusInput} class:settings={settingsClass} class:m-0={settingsMargin}>
    {#if icon}
        <span class="main__input_icon {icon}" />
    {/if}
    {#if type === "password"}
    <input
        type="password"
        bind:value={value}
        bind:this={TextInput}
        on:input={(event) => {if (setValue) setValue (event.target.value)}}
        placeholder={placeholder}
        class="main__input_text" 
        on:focus={ onFuncFocus }
        on:blur={ onFuncBlur } />
    {:else}
    <input
        type="text"
        bind:value={value}
        bind:this={TextInput}
        on:input={(event) => {if (setValue) setValue (event.target.value)}}
        placeholder={placeholder}
        class="main__input_text" 
        on:focus={ onFuncFocus }
        on:blur={ onFuncBlur } />
    {/if}
</div>