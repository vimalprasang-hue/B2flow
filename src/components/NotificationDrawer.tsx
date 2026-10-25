import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Bell, ExternalLink, Trash2 } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setRole,
    setClientTab,
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm h-full bg-[#0D1420] border-l border-white/10 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#080D16]">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-[#E5B94F]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Notifications
            </h3>
            <span className="px-1.5 py-0.5 rounded-full bg-[#E5B94F]/20 text-[#E5B94F] text-[10px] font-bold">
              {notifications.filter((n) => !n.read).length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-white/50 hover:text-white transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-white/40 text-xs">
              No new notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.linkTab) {
                    setRole('CLIENT');
                    setClientTab(n.linkTab);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-[#121A27]/60 border-white/5 text-white/60'
                    : 'bg-[#162132] border-[#E5B94F]/30 text-white shadow-md shadow-black/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-white/90">{n.title}</h4>
                  <span className="text-[10px] text-white/40">{n.timestamp}</span>
                </div>
                <p className="text-[11px] text-white/70 mt-1 leading-snug">
                  {n.description}
                </p>
                {n.linkTab && (
                  <div className="mt-2 text-[10px] text-[#E5B94F] font-semibold flex items-center space-x-1">
                    <span>View in {n.linkTab}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
