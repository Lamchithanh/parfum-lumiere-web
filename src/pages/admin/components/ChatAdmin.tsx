import { useState } from 'react';
import { Search, Send, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    lastSeen: string;
  };
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    user: {
      id: 'user1',
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastSeen: '2 phút trước'
    },
    lastMessage: 'Xin chào, tôi muốn hỏi về sản phẩm...',
    unreadCount: 2,
    messages: [
      {
        id: 'msg1',
        sender: {
          id: 'user1',
          name: 'Nguyễn Văn A',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        content: 'Xin chào, tôi muốn hỏi về sản phẩm Chanel N°5',
        timestamp: '10:30',
        read: true
      },
      {
        id: 'msg2',
        sender: {
          id: 'admin',
          name: 'Admin',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        content: 'Chào bạn, tôi có thể giúp gì cho bạn?',
        timestamp: '10:31',
        read: true
      },
      {
        id: 'msg3',
        sender: {
          id: 'user1',
          name: 'Nguyễn Văn A',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        content: 'Sản phẩm này còn hàng không?',
        timestamp: '10:32',
        read: false
      }
    ]
  },
  {
    id: 'conv2',
    user: {
      id: 'user2',
      name: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastSeen: '5 phút trước'
    },
    lastMessage: 'Cảm ơn bạn đã tư vấn...',
    unreadCount: 0,
    messages: [
      {
        id: 'msg4',
        sender: {
          id: 'user2',
          name: 'Trần Thị B',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        content: 'Tôi muốn đặt hàng sản phẩm Dior Sauvage',
        timestamp: '09:15',
        read: true
      },
      {
        id: 'msg5',
        sender: {
          id: 'admin',
          name: 'Admin',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        content: 'Vâng, tôi sẽ giúp bạn đặt hàng',
        timestamp: '09:16',
        read: true
      },
      {
        id: 'msg6',
        sender: {
          id: 'user2',
          name: 'Trần Thị B',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        content: 'Cảm ơn bạn đã tư vấn',
        timestamp: '09:20',
        read: true
      }
    ]
  }
];

const ChatAdmin = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleSearch = () => {
    // Implement search logic
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: `msg${Date.now()}`,
                sender: {
                  id: 'admin',
                  name: 'Admin',
                  avatar: 'https://i.pravatar.cc/150?img=5'
                },
                content: newMessage,
                timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                read: true
              }
            ]
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Danh sách cuộc trò chuyện */}
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Tin nhắn</h1>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Tìm kiếm tin nhắn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 mr-3">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{conversation.user.name}</div>
                    <div className="text-sm text-gray-500">{conversation.user.lastSeen}</div>
                  </div>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="bg-[#1a1a1a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-500 truncate">
                {conversation.lastMessage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nội dung cuộc trò chuyện */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 mr-3">
                <img
                  src={selectedConversation.user.avatar}
                  alt={selectedConversation.user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="font-medium">{selectedConversation.user.name}</div>
                <div className="text-sm text-gray-500">{selectedConversation.user.lastSeen}</div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Xem thông tin</DropdownMenuItem>
                <DropdownMenuItem>Đánh dấu đã đọc</DropdownMenuItem>
                <DropdownMenuItem>Xóa cuộc trò chuyện</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender.id === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender.id === 'admin'
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-[#1a1a1a] hover:bg-[#333] text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Chọn một cuộc trò chuyện để bắt đầu
        </div>
      )}
    </div>
  );
};

export default ChatAdmin; 