export type NodeType = 'file' | 'folder' | 'file-input' | 'folder-input'

export type TreeNode = {
  id: number
  type: NodeType
  name?: string
  isSelected?: boolean
  children?: TreeNode[]
  isExpanded?: boolean
}
