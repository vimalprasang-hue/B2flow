import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
  Send,
  AlertCircle,
} from 'lucide-react';
import { ContentItem } from '../../types';

export const ClientApprovalsTab: React.FC = () => {
  const {
    contentItems,
    approveContent,
    requestContentChanges,
    rejectContent,
    currentClient,
    showToast,
  } = useApp();

  const [activeItem, setActiveItem] = useState<ContentItem | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [actionType, setActionType] = useState<'changes' | 'reject'>('changes');

  const clientContent = contentItems.filter(
    (item) => item.clientId === currentClient.id || !item.clientId
  );

  const pendingItems = clientContent.filter(
    (item) => item.status === 'Pending Client Approval'
  );
  const approvedItems = clientContent.filter((item) => item.status === 'Approved');
  const otherItems = clientContent.filter(
    (item) => item.status !== 'Pending Client Approval' && item.status !== 'Approved'
  );

  const handleAction = (item: ContentItem, type: 'changes' | 'reject') => {
    setActiveItem(item);
    setActionType(type);
    setFeedbackText(item.clientFeedback || '');
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    if (!activeItem) return;
    if (actionType === 'changes') {
      requestContentChanges(activeItem.id, feedbackText || 'Minor copy tweaks requested.');
    } else {
      rejectContent(activeItem.id, feedbackText || 'Rejected by client.');
    }
    setShowFeedbackModal(false);
    setActiveItem(null);
    setFeedbackText('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            CLIENT APPROVAL HUB
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Content Approval System
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Review and sign off on upcoming Instagram Reels, Carousels, and Facebook posts prepared by the BUILD2FLOW creative team.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="p-3 rounded-xl bg-[#121A27] border border-white/10 text-center">
            <span className="text-[10px] text-white/50 block">Pending Review</span>
            <span className="text-xl font-bold text-[#E5B94F]">{pendingItems.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#121A27] border border-white/10 text-center">
            <span className="text-[10px] text-white/50 block">Approved</span>
            <span className="text-xl font-bold text-emerald-400">{approvedItems.length}</span>
          </div>
        </div>
      </div>

      {/* PENDING ITEMS LIST */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5B94F] animate-pulse" />
          <span>Awaiting Your Approval ({pendingItems.length})</span>
        </h3>

        {pendingItems.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0D1420] border border-white/10 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">All Caught Up!</h4>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              You have reviewed all current creatives. Our production team will upload the next batch for your scheduled shoot.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-[#0D1420] border-2 border-[#E5B94F]/40 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Media preview */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center space-x-1 border border-white/20">
                        {item.platform === 'Instagram' ? (
                          <Instagram className="w-3 h-3 text-[#E5B94F] mr-1" />
                        ) : (
                          <Facebook className="w-3 h-3 text-blue-400 mr-1" />
                        )}
                        <span>{item.platform}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#E5B94F] text-black font-extrabold text-[10px] uppercase">
                        {item.mediaType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] text-white/80 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#E5B94F]" />
                      <span>{item.scheduledDate}</span>
                    </div>
                  </div>

                  {/* Copy & caption */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-white/40 mt-0.5">Created by BUILD2FLOW Creative Studio</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5B94F] block">
                        Prepared Caption & Hashtags:
                      </span>
                      <p className="text-xs text-white/80 whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Approval Action Buttons (APPROVE / REQUEST CHANGES / REJECT) */}
                <div className="p-6 pt-0 border-t border-white/10 mt-4 pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => approveContent(item.id)}
                    className="w-full sm:flex-1 py-3 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#E5B94F]/20 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>APPROVE</span>
                  </button>

                  <button
                    onClick={() => handleAction(item, 'changes')}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#121A27] hover:bg-[#1a2538] text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#E5B94F]" />
                    <span>REQUEST CHANGES</span>
                  </button>

                  <button
                    onClick={() => handleAction(item, 'reject')}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider border border-red-500/30 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>REJECT</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALL CONTENT HISTORY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">Content Library & Publishing Status</h3>
        <div className="space-y-3">
          {clientContent.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#121A27] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-white/50">{item.platform} • Scheduled: {item.scheduledDate}</p>
                  {item.clientFeedback && (
                    <span className="text-[11px] text-amber-300 block mt-1">
                      Feedback: "{item.clientFeedback}"
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.status === 'Approved'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : item.status === 'Pending Client Approval'
                      ? 'bg-[#E5B94F]/20 text-[#E5B94F] border border-[#E5B94F]/40'
                      : item.status === 'Changes Requested'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Changes / Reject Feedback Modal */}
      {showFeedbackModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0D1420] border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white">
              {actionType === 'changes' ? 'Request Creative Changes' : 'Reject Content'}
            </h4>
            <p className="text-xs text-white/60">
              Provide instructions for Liam and the BUILD2FLOW production team for "{activeItem.title}":
            </p>
            <textarea
              rows={4}
              placeholder="e.g. Please tag the architect studio @keller_architecture and adjust the caption to mention custom spotted gum timber..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E5B94F]"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="px-5 py-2 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6aa3f]"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
