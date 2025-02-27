
<script>
    import './main.sass'
    export const visible = false;
    export const opacity;
</script>
<div id="popuscontainer" class:active={visible} style="opacity: {opacity}">
    <slot />
</div>