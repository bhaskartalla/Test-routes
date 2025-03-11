'use client'

import Image from 'next/image'
import { Tree } from '@/assets/data/file-folder-data'
import './styles.css'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { TreeNode } from '@/types/file-folder'
import { getRandomInt, makeid } from '@/utils'
import folderOpenIcon from '@/assets/icons/folder-open-icon.png'
import folderCloseIcon from '@/assets/icons/folder-close-icon.png'
import fileIcon from '@/assets/icons/file-icon.png'

function List({
  tree,
  setTree,
}: {
  tree: TreeNode[]
  setTree: Dispatch<SetStateAction<TreeNode[]>>
}) {
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [passiveSelectID, setPassiveSelectID] = useState(-1)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleFFClick = (id: number) => {
    setTree((prev) => {
      function makeAllSelectionFalse(nodeList: TreeNode[]): TreeNode[] {
        let res: TreeNode[] = []
        for (let node of nodeList) {
          if (node.isExpanded) node.isSelected = false
          if (node.children)
            node.children = makeAllSelectionFalse(node.children)
          res.push(node)
        }
        return res
      }

      function updateNode(node: TreeNode, parent = -1): TreeNode {
        if (node.id === id) {
          let newNode = { ...node }
          newNode.isSelected = true
          if (node.type === 'folder') newNode.isExpanded = !newNode.isExpanded

          return newNode
        }
        if (node.children) {
          const updatedChildren = node.children.map((ele) =>
            updateNode(ele, node.id)
          )
          return { ...node, children: updatedChildren, isSelected: false }
        }
        return { ...node, isSelected: false }
      }
      return makeAllSelectionFalse(prev).map((ele) => updateNode(ele, -1))
    })
  }

  const handleFFNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    console.log('🚀 ~ List ~ event:', { value })
    //   setNewFFDetails(value)
  }

  const handleDeleteFileFolder = () => {
    setTree((prev) => {
      let isOperationCompleted = false

      function updateTree(nodeList: TreeNode[]): TreeNode[] {
        let res: TreeNode[] = []
        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i]
          if (node.id === passiveSelectID) {
            isOperationCompleted = true
            return [...res, ...nodeList.slice(i + 1)]
          }
          if (isOperationCompleted) return [...res, ...nodeList.slice(i)]
          if (node.children) node.children = updateTree(node.children)
          res.push(node)
        }
        return res
      }
      return updateTree(prev)
    })
    setMenuVisible(false)
  }

  const handleContextMenu = (
    event: React.MouseEvent,
    passiveSelectID: number
  ) => {
    event.preventDefault()
    setMenuPosition({ x: event.clientX, y: event.clientY })
    setMenuVisible(true)
    setPassiveSelectID(passiveSelectID)
  }

  return (
    <div className='ff-container'>
      {tree.map((node: TreeNode) => (
        <div
          id={`${node.id}`}
          key={node.id}
        >
          {node.type.includes('input') ? (
            <span className='ff-input-wrap'>
              {node.type === 'file-input' ? (
                <Image
                  width={18}
                  height={18}
                  src={fileIcon}
                  alt='File icon'
                />
              ) : (
                <Image
                  width={18}
                  height={18}
                  src={folderCloseIcon}
                  alt='Folder is close'
                />
              )}
              <input
                className='ff-input'
                onChange={handleFFNameChange}
                value={'newFFDetails.value'}
                autoFocus
              />
            </span>
          ) : (
            <span
              className={`ff-child ${node?.isSelected && 'ff-selected'}`}
              onClick={() => handleFFClick(node.id)}
              onContextMenu={(event) => handleContextMenu(event, node.id)}
            >
              {node.type === 'folder' ? (
                <>
                  <span
                    className={`chevron ${
                      node.isExpanded ? 'c-collapse' : 'c-expand'
                    }`}
                  />
                  <Image
                    width={18}
                    height={18}
                    src={node.isExpanded ? folderOpenIcon : folderCloseIcon}
                    alt={node.isExpanded ? 'Folder is open' : 'Folder is close'}
                  />
                </>
              ) : (
                <Image
                  width={18}
                  height={18}
                  src={fileIcon}
                  alt='File icon'
                />
              )}
              {node.name}
            </span>
          )}
          {node.type === 'folder' && node.isExpanded && node.children && (
            <List
              tree={node.children}
              setTree={setTree}
            />
          )}
        </div>
      ))}
      {menuVisible && (
        <div
          ref={menuRef}
          className='menu-items'
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
        >
          <ul className='menu-items-ul'>
            <li onClick={handleDeleteFileFolder}>delete</li>
          </ul>
        </div>
      )}
    </div>
  )
}

const FileFolder = () => {
  const [tree, setTree] = useState<TreeNode[]>(Tree)
  const [newFFDetails, setNewFFDetails] = useState({
    inputVisible: false,
    value: '',
  })

  const handleAddFileFolder = (isFolder: boolean) => {
    const newNode: TreeNode = {
      id: -1,
      type: 'file',
      name: makeid(false),
      // type: `${isFolder ? 'folder' : 'file'}-input`,
    }

    setTree((prev) => {
      let isOperationCompleted = false
      function updateTree(nodeList: TreeNode[]): TreeNode[] {
        let res: TreeNode[] = []
        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i]

          if (node.isSelected) {
            isOperationCompleted = true
            if (node.children) {
              node.children.push({ ...newNode, id: getRandomInt(100, 999) })
              return [...res, ...nodeList.slice(i)]
            }
            return [
              ...res,
              ...nodeList.slice(i),
              { ...newNode, id: getRandomInt(100, 999) },
            ]
          }
          if (isOperationCompleted) return [...res, ...nodeList.slice(i)]
          if (node.children) node.children = updateTree(node.children)
          res.push(node)
        }
        return res
      }

      return updateTree(prev)
    })
  }

  const handleCollapseAll = () => {
    setTree((prev) => {
      function updateTree(nodeList: TreeNode[]): TreeNode[] {
        let res: TreeNode[] = []
        for (let node of nodeList) {
          if (node.isExpanded) node.isExpanded = false
          if (node.children) node.children = updateTree(node.children)
          res.push(node)
        }
        return res
      }
      return updateTree(prev)
    })
  }

  return (
    <main className='ff-main'>
      <h1>FileFolder</h1>
      <div className='ff-container ff-container-wrap'>
        <div className='ff-heading'>
          <div className='ff-title'>Test-Routes</div>
          <div className='ff-controls'>
            <span
              className='ff-icon file'
              onClick={() => handleAddFileFolder(false)}
            >
              f
            </span>
            <span
              className='ff-icon folder'
              onClick={() => handleAddFileFolder(true)}
            >
              F
            </span>
            <span
              className='ff-icon collapse-all'
              onClick={handleCollapseAll}
            >
              C
            </span>
          </div>
        </div>
        <List
          tree={tree}
          setTree={setTree}
        />
      </div>
    </main>
  )
}
export default FileFolder
