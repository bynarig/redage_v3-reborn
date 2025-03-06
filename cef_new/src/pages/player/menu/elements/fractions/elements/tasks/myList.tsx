<script>
    export const onSetLoad;
    import { executeClientToGroup } from '#/shared/api/rage'
    executeClientToGroup('tasksMyLoad')

    import Tasks from './tasks.svelte'
</script>

<Tasks {onSetLoad} />