import useChats from "@/api/queries/useChats";
import useUsers from "@/api/queries/useUsers";

const useChat = () => {
    const { data: chatsData, isLoading: chatsLoading } = useChats();
    const chats = chatsData?.data?.chats ?? [];

    const { data: usersData, isLoading: usersLoading } = useUsers();
    const users = usersData?.data?.users ?? [];

    return { chats, chatsLoading, users, usersLoading }
}

export default useChat