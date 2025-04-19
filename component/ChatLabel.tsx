import { useUser } from '@/app/Context/UserContext';
import { assets } from '@/assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';





interface ChatLabelProps {
    openMenu: { id: string; open: boolean };
    setOpenMenu: React.Dispatch<React.SetStateAction<{ id: string; open: boolean }>>;
    id: string;
    name: string;
}

const ChatLabel: React.FC<ChatLabelProps> = ({ openMenu, setOpenMenu, id, name }) => {
    const { fetchUserChat, chats, setSelectedChat } = useUser();

    const selectChat = () => {
        const chatData = chats.find((chat) => chat._id === id);

        if (chatData) {
            setSelectedChat(chatData);
        }
    };

    const renameChat = async (e: React.MouseEvent) => {
        try {
            const newName = prompt("Enter new name");
            if (!newName) {
                return;
            }
            const { data } = await axios.post("/api/v1/chat/rename", { chatId: id, name: newName });
            if (data.success) {
                await fetchUserChat();
                setOpenMenu({ id: '', open: false });
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || 'An error occurred');
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    const deleteChat = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const confirm = window.confirm("Are you sure you want to delete this chat?");
            if (!confirm) {
                return;
            }
            const { data } = await axios.post("/api/v1/chat/delete", { chatId: id });
            if (data.success) {
                setOpenMenu({ id: '', open: false });
                await fetchUserChat();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || 'An error occurred');
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div
            onClick={selectChat}
            className="flex items-center justify-between p-2 text-white/80 hover:text-white/60 rounded-lg text-sm group cursor-pointer"
        >
            <p className="group-hover:max-w-5/6 truncate">{name}</p>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu((prev: { id: string; open: boolean }) =>
                        prev.id === id && prev.open ? { id: '', open: false } : { id: id, open: true }
                    );
                }}
                className="group z-100 relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg"
            >
                <Image
                    src={assets.three_dots}
                    alt="menu"
                    className={`w-4 ${openMenu.id === id && openMenu.open ? "hidden" : ""}`}
                />

                <div
                    className={`absolute ${openMenu.id === id && openMenu.open ? "block" : "hidden"
                        } -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
                >
                    <div
                        onClick={renameChat}
                        className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg"
                    >
                        <Image src={assets.pencil_icon} alt="rename" className="w-4" />
                        <p>Rename</p>
                    </div>
                    <div
                        onClick={deleteChat}
                        className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg"
                    >
                        <Image src={assets.delete_icon} alt="delete" className="w-4" />
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatLabel;