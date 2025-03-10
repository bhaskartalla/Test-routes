import { TreeNode } from '@/types/file-folder'

export const Tree: TreeNode[] = [
  {
    id: 1,
    type: 'folder' as const,
    name: 'public',
    isSelected: false,
    isExpanded: false,
    children: [
      {
        id: 11,
        type: 'file' as const,
        name: 'index.html',
        isSelected: false,
      },
    ],
  },
  {
    id: 2,
    type: 'folder' as const,
    name: 'src',
    isSelected: false,
    children: [
      {
        id: 21,
        type: 'folder' as const,
        name: 'components',
        isSelected: false,
        children: [
          {
            id: 211,
            type: 'file' as const,
            name: 'Interests.tsx',
            isSelected: false,
          },
          {
            id: 212,
            type: 'file' as const,
            name: 'Profile.tsx',
            isSelected: false,
          },
          {
            id: 213,
            type: 'file' as const,
            name: 'Settings.tsx',
            isSelected: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: 22,
        type: 'file' as const,
        name: 'App.tsx',
        isSelected: false,
      },
      {
        id: 23,
        type: 'file' as const,
        name: 'index.tsx',
        isSelected: false,
      },
      {
        id: 24,
        type: 'file' as const,
        name: 'style.css',
        isSelected: false,
      },
      {
        id: 25,
        type: 'file' as const,
        name: 'types.ts',
        isSelected: false,
      },
    ],
    isExpanded: false,
  },
  {
    id: 3,
    type: 'file' as const,
    name: 'package.json',
    isSelected: false,
  },
  {
    id: 4,
    type: 'file' as const,
    name: 'tsconfig.json',
    isSelected: false,
  },
]
