/// <reference types="vite/client" />

interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  kind: 'directory';
}

interface Window {
  showDirectoryPicker(options?: { mode: 'read' }): Promise<FileSystemDirectoryHandle>;
}