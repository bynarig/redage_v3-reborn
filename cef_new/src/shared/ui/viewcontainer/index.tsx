
<script>
    import './main.sass'
    export const visible = false;
    export const opacity;
</script>
<div id="viewcontainer" class:active={!visible} style="opacity: {opacity}">
    <slot />
</div>