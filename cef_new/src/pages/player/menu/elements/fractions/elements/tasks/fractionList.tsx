<script>
    export const onSetLoad;
    import { executeClientToGroup } from '#/shared/api/rage'
    executeClientToGroup('tasksLoad')

    import Tasks from './tasks.svelte'
</script>

<Tasks {onSetLoad} />