"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Play,
  Plus,
  Share2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  votes: number;
}

export default function YouTubeVotingQueue() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      votes: 5,
    },
    { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", votes: 3 },
    {
      id: "kJQP7kiw5Fk",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
      votes: 2,
    },
  ]);

  const REFRESH_INTERVAL_MS = 10 * 1000;

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [previewVideoId, setPreviewVideoId] = useState("");

  async function refreshStreams() {
    const res = await axios.get("/api/streams/my");
    console.log(res);
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {}, REFRESH_INTERVAL_MS);
  }, []);

  useEffect(() => {
    if (!currentVideo && videos.length > 0) {
      setCurrentVideo(videos[0]);
      setVideos(videos.slice(1));
    }
  }, [videos, currentVideo]);

  const handleVote = (id: string, increment: number) => {
    setVideos(
      videos
        .map((video) =>
          video.id === id ? { ...video, votes: video.votes + increment } : video
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(newVideoUrl);
    if (videoId) {
      setVideos([
        ...videos,
        { id: videoId, title: `Video ${videoId}`, votes: 0 },
      ]);
      setNewVideoUrl("");
      setPreviewVideoId("");
      toast.success("Video added successfully!");
    } else {
      toast.error("Invalid YouTube URL");
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
    );
    return match ? match[1] : null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVideoUrl(e.target.value);
    const videoId = extractVideoId(e.target.value);
    if (videoId) {
      setPreviewVideoId(videoId);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "YouTube Voting Queue",
      text: "Join my YouTube Voting Queue!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Error sharing");
      }
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying link:", error);
          toast.error("Error copying link");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">YouTube Voting Queue</h1>
          <Button onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Currently Playing</CardTitle>
            </CardHeader>
            <CardContent>
              {currentVideo ? (
                <div className="aspect-w-16 aspect-h-9 h-[70vh]">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <p>No video currently playing</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Video</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="YouTube Video URL"
                  value={newVideoUrl}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Video
                </Button>
              </form>
              {previewVideoId && (
                <div className="mt-4 aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${previewVideoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Video Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {videos.map((video) => (
                    <li
                      key={video.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                          alt={video.title}
                          className="w-24 h-18 object-cover"
                        />
                        <span className="font-semibold">{video.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">{video.votes}</span>
                        <Button
                          size="sm"
                          onClick={() => handleVote(video.id, 1)}
                        >
                          <ArrowUpCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleVote(video.id, -1)}
                        >
                          <ArrowDownCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
