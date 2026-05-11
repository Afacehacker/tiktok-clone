import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Menu, 
  Grid3X3, 
  Lock, 
  Bookmark, 
  Play, 
  Home, 
  Users, 
  Plus, 
  MessageSquare, 
  User,
  Camera,
  ChevronRight
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [profile, setProfile] = useState({
    name: '',
    username: 'tiktok_creator',
    bio: '✨ Creating awesome content\n📍 Location | 📧 collab@example.com\n👇 Link in bio',
    following: '45',
    followers: '5.2M',
    likes: '12.8M',
    avatar: null
  });

  const [videos, setVideos] = useState([
    { id: 1, views: '1.2M', url: null },
    { id: 2, views: '800K', url: null },
    { id: 3, views: '2.5M', url: null },
    { id: 4, views: '100K', url: null },
    { id: 5, views: '3.4M', url: null },
    { id: 6, views: '450K', url: null },
    { id: 7, views: '1.1M', url: null },
    { id: 8, views: '95K', url: null },
    { id: 9, views: '200K', url: null },
    { id: 10, views: '50K', url: null },
    { id: 11, views: '10M', url: null },
    { id: 12, views: '3M', url: null }
  ]);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handlePostUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newVideo = {
        id: Date.now(),
        views: '0',
        url: URL.createObjectURL(e.target.files[0])
      };
      setVideos([newVideo, ...videos]);
    }
  };

  const saveVideoEdit = (newViews) => {
    setVideos(videos.map(v => v.id === editingVideo.id ? { ...v, views: newViews } : v));
    setEditingVideo(null);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans flex justify-center">
      <div className="w-full max-w-[480px] bg-black min-h-screen relative border-x border-zinc-900 pb-16">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 bg-black flex items-center justify-between px-4 py-3 border-b border-zinc-900">
        <button className="p-1">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">@{profile.username}</h1>
        <button className="p-1">
          <Menu size={24} />
        </button>
      </header>

      {/* Profile Info */}
      <div className="pt-6 px-4 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4 border border-zinc-700 overflow-hidden flex items-center justify-center text-zinc-500 text-xs relative">
          {profile.avatar ? <img src={profile.avatar} className="absolute inset-0 w-full h-full object-cover" alt="avatar" /> : (profile.name || 'Photo')}
        </div>
        <h2 className="text-xl font-semibold mb-6">@{profile.username}</h2>

        {/* Stats Section */}
        <div className="flex gap-8 mb-6">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{profile.following}</span>
            <span className="text-xs text-zinc-400">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{profile.followers}</span>
            <span className="text-xs text-zinc-400">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{profile.likes}</span>
            <span className="text-xs text-zinc-400">Likes</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6 w-full max-w-[300px]">
          <button 
            onClick={() => setIsEditOpen(true)}
            className="flex-1 bg-zinc-800 py-2.5 rounded-md font-semibold text-[15px] border border-zinc-700 active:bg-zinc-700 transition-colors"
          >
            Edit profile
          </button>
          <button className="flex-1 bg-zinc-800 py-2.5 rounded-md font-semibold text-[15px] border border-zinc-700 active:bg-zinc-700 transition-colors">
            Share profile
          </button>
        </div>

        {/* Bio */}
        <div className="text-center text-sm mb-6 max-w-[80%] whitespace-pre-wrap">
          {profile.bio}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[53px] z-40 bg-black flex border-b border-zinc-800">
        <button 
          onClick={() => setActiveTab('videos')}
          className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'videos' ? 'border-white text-white' : 'border-transparent text-zinc-500'}`}
        >
          <Grid3X3 size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('private')}
          className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'private' ? 'border-white text-white' : 'border-transparent text-zinc-500'}`}
        >
          <Lock size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'favorites' ? 'border-white text-white' : 'border-transparent text-zinc-500'}`}
        >
          <Bookmark size={24} />
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="bg-zinc-800 aspect-[3/4] relative cursor-pointer group"
            onClick={() => setEditingVideo(video)}
          >
            {video.url && <img src={video.url} className="w-full h-full object-cover" alt="post" />}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded">Edit views</span>
            </div>
            <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-xs font-semibold drop-shadow-md">
              <Play size={14} className="fill-transparent drop-shadow-md" />
              <span>{video.views}</span>
            </div>
          </div>
        ))}
      </div>

        {/* Bottom Navigation Bar */}
        <nav className="absolute sm:fixed bottom-0 sm:left-1/2 sm:-translate-x-1/2 left-0 right-0 w-full sm:max-w-[480px] bg-black border-t border-zinc-900 flex justify-between items-center px-4 py-2 pb-safe z-50">
        <button className="flex flex-col items-center gap-1 text-zinc-400 active:text-white">
          <Home size={24} />
          <span className="text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-400 active:text-white">
          <Users size={24} />
          <span className="text-[10px]">Friends</span>
        </button>
        
        {/* Upload Button */}
        <label className="w-12 h-8 bg-white rounded-lg flex items-center justify-center relative mt-1 cursor-pointer">
          <input type="file" accept="image/*,video/*" className="hidden" onChange={handlePostUpload} />
          <div className="absolute w-full h-full border-l-4 border-cyan-400 border-r-4 border-rose-500 rounded-lg -z-10 blur-[1px]"></div>
          <Plus size={20} className="text-black font-bold stroke-[3px]" />
        </label>

        <button className="flex flex-col items-center gap-1 text-zinc-400 active:text-white">
          <MessageSquare size={24} />
          <span className="text-[10px]">Inbox</span>
        </button>
          <button className="flex flex-col items-center gap-1 text-white">
            <User size={24} />
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </nav>

        {/* Edit Profile Modal */}
        {isEditOpen && (
          <div className="absolute inset-0 z-[100] bg-black text-white flex flex-col sm:max-w-[480px] sm:mx-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-900 sticky top-0 bg-black z-10">
              <button onClick={() => setIsEditOpen(false)} className="text-white p-1">
                <ArrowLeft size={24} />
              </button>
              <h2 className="font-semibold text-lg">Edit profile</h2>
              <div className="w-8"></div> {/* Spacer for centering */}
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-20">
              <label className="flex flex-col items-center mb-8 mt-4 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <div className="w-24 h-24 rounded-full bg-zinc-800 mb-2 relative flex items-center justify-center overflow-hidden">
                  {profile.avatar && <img src={profile.avatar} className="absolute inset-0 w-full h-full object-cover" alt="avatar" />}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <Camera size={28} className="text-white opacity-80" />
                  </div>
                </div>
                <span className="text-sm font-medium">Change photo</span>
              </label>

              <div className="space-y-6 px-2">
                <div className="flex flex-col">
                  <label className="text-[13px] text-zinc-400 mb-1 font-medium">Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    placeholder="Your Name"
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-[15px] focus:border-zinc-400 transition-colors" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] text-zinc-400 mb-1 font-medium">Username</label>
                  <input 
                    type="text" 
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-[15px] focus:border-zinc-400 transition-colors" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[13px] text-zinc-400 mb-1 font-medium">Bio</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-[15px] min-h-[100px] resize-none focus:border-zinc-400 transition-colors" 
                    placeholder="Add a bio"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-zinc-900">
                  <div className="flex flex-col">
                    <label className="text-[13px] text-zinc-400 mb-1 font-medium">Following</label>
                    <input 
                      type="text" 
                      value={profile.following}
                      onChange={(e) => setProfile({...profile, following: e.target.value})}
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-[15px] focus:border-zinc-400 transition-colors" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] text-zinc-400 mb-1 font-medium">Followers</label>
                    <input 
                      type="text" 
                      value={profile.followers}
                      onChange={(e) => setProfile({...profile, followers: e.target.value})}
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-[15px] focus:border-zinc-400 transition-colors" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] text-zinc-400 mb-1 font-medium">Likes</label>
                    <input 
                      type="text" 
                      value={profile.likes}
                      onChange={(e) => setProfile({...profile, likes: e.target.value})}
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-[15px] focus:border-zinc-400 transition-colors" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Post Modal */}
        {editingVideo && (
          <div className="absolute inset-0 z-[110] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-[320px] shadow-2xl border border-zinc-800">
              <h3 className="text-lg font-bold mb-4 text-center">Edit Post Details</h3>
              <div className="mb-6">
                <label className="text-sm text-zinc-400 block mb-2">View Count</label>
                <input 
                  type="text"
                  defaultValue={editingVideo.views}
                  id="viewCountInput"
                  className="w-full bg-zinc-800 rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingVideo(null)}
                  className="flex-1 py-2 rounded-md font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => saveVideoEdit(document.getElementById('viewCountInput').value)}
                  className="flex-1 py-2 bg-white text-black rounded-md font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
