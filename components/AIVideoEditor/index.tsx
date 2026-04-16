'use client';

import React from 'react';
import { EditorShell } from './EditorShell';
import { Shot } from '../../types';

interface AIVideoEditorModalProps {
  open: boolean;
  onClose: () => void;
  completedShots: Shot[];
}

export const AIVideoEditorModal: React.FC<AIVideoEditorModalProps> = ({
  open,
  onClose,
  completedShots,
}) => {
  // Convert completed shots to media files for the editor
  const initialMediaFiles = completedShots
    .filter(shot => shot.interval?.status === 'completed' && shot.interval?.videoUrl)
    .map(shot => ({
      id: shot.id,
      url: shot.interval!.videoUrl!,
      name: `Shot-${shot.id}: ${shot.actionSummary.slice(0, 30)}${shot.actionSummary.length > 30 ? '...' : ''}`,
      duration: shot.interval!.duration || 0,
    }));

  if (!open) return null;

  return (
    <EditorShell
      onClose={onClose}
      initialMediaFiles={initialMediaFiles}
    />
  );
};

export default AIVideoEditorModal;
export * from './editor-context';
export * from './MediaPanel';
export * from './Timeline';
export * from './VideoPreview';
export * from './InspectorPanel';
export * from './EditorShell';
