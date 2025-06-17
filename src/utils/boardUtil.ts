// import { boardApi} from '../api/board.api';

// export const getDefaultBoardId = async (): Promise<string> => {
//   try {
//     const boards = await boardApi.getBoards()
    
//     if (boards.length > 0) {
//       return boards[0].id // Lấy board đầu tiên
//     }
    
//     // Nếu không có board, tạo board mặc định
//     const newBoard = await boardApi.createBoard({
//       title: "My First Board",
//       description: "Welcome to your workspace"
//     })
    
//     return newBoard.id
//   } catch (error) {
//     console.error("Failed to get default board:", error)
//     throw error
//   }
// }