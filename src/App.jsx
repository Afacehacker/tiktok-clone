import React, { useState } from 'react';
import { 
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
  UserPlus,
  Footprints,
  Forward,
  ChevronDown,
  Repeat2,
  Heart,
  Video,
  Wifi,
  Battery,
  Signal,
  Smartphone
} from 'lucide-react';

const App = () => {
  const [deviceType, setDeviceType] = useState(null);
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  // Form state for edits before saving
  const [editForm, setEditForm] = useState(null);

  const [profile, setProfile] = useState({
    name: 'Khadijah yusuf',
    username: 'goyankakagk',
    bio: '',
    following: '6',
    followers: '2,093',
    likes: '781',
    avatar: null
  });

  const [videos, setVideos] = useState([
    { id: 1, views: '145', url: null, type: 'image' },
    { id: 2, views: '229', url: null, type: 'image' },
    { id: 3, views: '216', url: null, type: 'image' },
    { id: 4, views: '2,507', url: null, type: 'image' },
    { id: 5, views: '1,926', url: null, type: 'image' },
  ]);

  const openEdit = () => {
    setEditForm({ ...profile });
    setIsEditOpen(true);
  };

  const saveEdit = () => {
    setProfile({ ...editForm });
    setIsEditOpen(false);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditForm({ ...editForm, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handlePostUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newVideo = {
        id: Date.now(),
        views: '0',
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image'
      };
      setVideos([newVideo, ...videos]);
      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = null;
    }
  };

  const saveVideoEdit = (newViews) => {
    setVideos(videos.map(v => v.id === editingVideo.id ? { ...v, views: newViews } : v));
    setEditingVideo(null);
  };

  if (!deviceType) {
    return (
      <div className="bg-zinc-100 min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Smartphone size={32} className="text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Select Template</h1>
          <p className="text-gray-500 mb-8 text-sm">Choose the device operating system template for your TikTok profile clone.</p>
          <div className="space-y-4">
            <button 
              onClick={() => setDeviceType('iphone')}
              className="w-full py-3.5 rounded-xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-md"
            >
              iPhone Template
            </button>
            <button 
              onClick={() => setDeviceType('android')}
              className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-md"
            >
              Android Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 min-h-screen text-black font-sans flex justify-center relative">
      {/* Floating Change Template Button */}
      <button 
        onClick={() => setDeviceType(null)}
        className="fixed top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors z-[200] border border-gray-200 hidden sm:block"
      >
        Change Template
      </button>

      <div className={`w-full max-w-[480px] bg-white min-h-screen relative shadow-lg pb-16 ${deviceType === 'iphone' ? 'sm:rounded-[40px] sm:my-4 sm:border-[8px] sm:border-black sm:min-h-[calc(100vh-2rem)] overflow-hidden' : ''}`}>
        
        {/* Sticky Header Container */}
        <div className="sticky top-0 z-50 bg-white">
          {/* Status Bar */}
          {deviceType === 'iphone' ? (
            <div className="h-12 w-full flex items-center justify-between px-7 pt-2 text-black bg-white">
              <span className="text-[15px] font-semibold tracking-tight">9:41</span>
              
              {/* Dynamic Island Mock */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full top-1 hidden sm:block"></div>
              
              <div className="flex items-center gap-1.5">
                <Signal size={16} className="fill-black" />
                <Wifi size={16} />
                <Battery size={20} />
              </div>
            </div>
          ) : (
            <div className="h-8 w-full flex items-center justify-between px-3 text-black bg-white">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium tracking-tight mt-0.5">11:01</span>
                <MessageSquare size={12} className="fill-gray-500 text-gray-500" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold">4G</span>
                <Signal size={14} className="fill-black" />
                <span className="text-[11px] font-bold">66</span>
                <Battery size={16} className="fill-black" />
              </div>
            </div>
          )}

          {/* Top Navigation */}
          <header className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            {deviceType === 'iphone' ? (
              <>
                <button className="p-1"><Menu size={24} className="stroke-[1.5]" /></button>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[17px]">{profile.name}</span>
                  <ChevronDown size={18} className="stroke-[2]" />
                </div>
                <div className="flex items-center gap-3">
                  <Footprints size={22} className="stroke-[1.5]" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <UserPlus size={26} className="stroke-[1.5]" />
                    <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-black">
                  <div className="flex items-center gap-1">
                    <Footprints size={22} className="stroke-[1.5]" />
                    <span className="font-bold text-sm">99</span>
                  </div>
                  <Forward size={24} className="stroke-[1.5]" />
                  <Menu size={24} className="stroke-[1.5]" />
                </div>
              </>
            )}
          </header>
        </div>

        {/* Profile Info */}
        <div className="pt-2 px-4 flex flex-col items-center">
          {/* Status Bubble */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-1.5 mb-2 text-sm font-medium text-gray-700 relative">
            Coffee or tea?
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
          </div>

          {/* Profile Picture */}
          <div className="relative mb-3 mt-1">
            <div className="w-[96px] h-[96px] rounded-full bg-gray-200 border border-gray-200 overflow-hidden flex items-center justify-center">
              {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" alt="avatar" /> : <User size={40} className="text-gray-400" />}
            </div>
            <div className="absolute bottom-0 right-0 bg-cyan-400 text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
              <Plus size={16} className="stroke-[3]" />
            </div>
          </div>

          {/* Name & Username */}
          <div className="flex items-center gap-1 mb-1">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <ChevronDown size={20} className="stroke-[2] mt-1" />
            <button onClick={openEdit} className="ml-2 bg-gray-100 px-3 py-1.5 rounded-full font-semibold text-sm hover:bg-gray-200">
              Edit
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-5">@{profile.username}</p>

          {/* Stats Section */}
          <div className="flex justify-center gap-10 mb-4 w-full">
            <div className="flex flex-col items-center">
              <span className="font-bold text-[17px]">{profile.following}</span>
              <span className="text-[13px] text-gray-500">Following</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[17px]">{profile.followers}</span>
              <span className="text-[13px] text-gray-500">Follower</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[17px]">{profile.likes}</span>
              <span className="text-[13px] text-gray-500">Like</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6 text-sm w-full max-w-[320px] justify-center">
            <button className="bg-gray-100 px-4 py-2 rounded-sm font-semibold flex items-center gap-1">
              <Plus size={16} className="stroke-[2.5]" />
              Add bio
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-sm text-gray-600 flex items-center gap-1 truncate max-w-[180px]">
              <Video size={16} />
              I create content about...
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-[52px] z-40 bg-white flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'videos' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            <Grid3X3 size={24} className="stroke-[1.5]" />
          </button>
          <button 
            onClick={() => setActiveTab('private')}
            className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'private' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            <Lock size={22} className="stroke-[1.5]" />
          </button>
          <button 
            onClick={() => setActiveTab('repost')}
            className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'repost' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            <Repeat2 size={24} className="stroke-[1.5]" />
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'favorites' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            <Bookmark size={22} className="stroke-[1.5]" />
          </button>
          <button 
            onClick={() => setActiveTab('likes')}
            className={`flex-1 py-3 flex justify-center items-center border-b-2 ${activeTab === 'likes' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            <Heart size={22} className="stroke-[1.5]" />
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="bg-gray-200 aspect-[3/4] relative cursor-pointer group"
              onClick={() => setEditingVideo(video)}
            >
              {video.url ? (
                video.type === 'video' ? (
                  <video src={video.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  <img src={video.url} className="w-full h-full object-cover" alt="post" />
                )
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded">Edit views</span>
              </div>
              <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-[13px] font-semibold drop-shadow-md">
                <Play size={16} className="stroke-white fill-transparent stroke-[2] drop-shadow-md" />
                <span className="drop-shadow-md">{video.views}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Bar */}
        <nav className={`absolute sm:fixed bottom-0 sm:left-1/2 sm:-translate-x-1/2 left-0 right-0 w-full sm:max-w-[480px] bg-white border-t border-gray-200 flex justify-between items-center px-4 py-2 pb-safe z-50 ${deviceType === 'iphone' ? 'sm:rounded-b-[32px] pb-6' : ''}`}>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Home size={24} className="stroke-[1.5]" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Users size={24} className="stroke-[1.5]" />
            <span className="text-[10px] font-medium">Friends</span>
          </button>
          
          {/* Upload Button */}
          <label className="w-12 h-8 bg-black rounded-lg flex items-center justify-center relative mt-1 cursor-pointer">
            <input type="file" accept="image/*,video/*" className="hidden" onChange={handlePostUpload} />
            <div className="absolute w-full h-full border-l-4 border-cyan-400 border-r-4 border-rose-500 rounded-lg -z-10 blur-[1px]"></div>
            <Plus size={20} className="text-white font-bold stroke-[3px]" />
          </label>

          <button className="flex flex-col items-center gap-1 text-gray-400 relative">
            <MessageSquare size={24} className="stroke-[1.5]" />
            <div className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold border-2 border-white">58</div>
            <span className="text-[10px] font-medium">Inbox</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-black">
            <User size={24} className="stroke-[2.5]" />
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </nav>

        {/* Edit Profile Modal */}
        {isEditOpen && editForm && (
          <div className="absolute inset-0 z-[100] bg-white text-black flex flex-col sm:max-w-[480px] sm:mx-auto h-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <button onClick={() => setIsEditOpen(false)} className="text-black p-1">
                Cancel
              </button>
              <h2 className="font-semibold text-lg">Edit profile</h2>
              <button onClick={saveEdit} className="text-rose-500 font-semibold p-1">
                Save
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-20 bg-gray-50">
              <label className="flex flex-col items-center mb-8 mt-4 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 relative flex items-center justify-center overflow-hidden border border-gray-300">
                  {editForm.avatar ? <img src={editForm.avatar} className="absolute inset-0 w-full h-full object-cover" alt="avatar" /> : <User size={40} className="text-gray-400" />}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <Camera size={28} className="text-white opacity-80" />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">Change photo</span>
              </label>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden px-4">
                <div className="flex flex-col py-3 border-b border-gray-100">
                  <label className="text-[12px] text-gray-500 font-medium">Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-transparent outline-none text-[15px] font-medium py-1" 
                  />
                </div>
                <div className="flex flex-col py-3 border-b border-gray-100">
                  <label className="text-[12px] text-gray-500 font-medium">Username</label>
                  <input 
                    type="text" 
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    className="w-full bg-transparent outline-none text-[15px] font-medium py-1" 
                  />
                </div>
                <div className="flex flex-col py-3 border-b border-gray-100">
                  <label className="text-[12px] text-gray-500 font-medium">Bio</label>
                  <textarea 
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full bg-transparent outline-none text-[15px] font-medium min-h-[60px] resize-none py-1" 
                    placeholder="Add a bio"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 py-3">
                  <div className="flex flex-col">
                    <label className="text-[12px] text-gray-500 font-medium">Following</label>
                    <input 
                      type="text" 
                      value={editForm.following}
                      onChange={(e) => setEditForm({...editForm, following: e.target.value})}
                      className="w-full bg-transparent outline-none text-[15px] font-medium py-1" 
                    />
                  </div>
                  <div className="flex flex-col border-l border-gray-100 pl-4">
                    <label className="text-[12px] text-gray-500 font-medium">Followers</label>
                    <input 
                      type="text" 
                      value={editForm.followers}
                      onChange={(e) => setEditForm({...editForm, followers: e.target.value})}
                      className="w-full bg-transparent outline-none text-[15px] font-medium py-1" 
                    />
                  </div>
                  <div className="flex flex-col border-l border-gray-100 pl-4">
                    <label className="text-[12px] text-gray-500 font-medium">Likes</label>
                    <input 
                      type="text" 
                      value={editForm.likes}
                      onChange={(e) => setEditForm({...editForm, likes: e.target.value})}
                      className="w-full bg-transparent outline-none text-[15px] font-medium py-1" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Post Modal */}
        {editingVideo && (
          <div className="absolute inset-0 z-[110] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-[320px] shadow-2xl">
              <h3 className="text-lg font-bold mb-4 text-center">Edit Views</h3>
              <div className="mb-6">
                <input 
                  type="text"
                  defaultValue={editingVideo.views}
                  id="viewCountInput"
                  className="w-full bg-gray-100 rounded-md px-3 py-3 text-black font-semibold outline-none focus:ring-2 focus:ring-gray-300 text-center"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingVideo(null)}
                  className="flex-1 py-2 rounded-md font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => saveVideoEdit(document.getElementById('viewCountInput').value)}
                  className="flex-1 py-2 bg-rose-500 text-white rounded-md font-semibold hover:bg-rose-600 transition-colors"
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
