export const useModal = defineStore('modal', () => {
    const isOpen = ref(false)
    function openModal() {
        isOpen.value = true
    }

    function closeModal() {
        isOpen.value = false
    }

    return {isOpen, openModal, closeModal}
})