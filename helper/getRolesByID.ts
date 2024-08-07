import prisma from "../database/dbconfig";

export async function getUserRoles(userId: any): Promise<string[]> {
    try {
      const roles = await prisma.userRoles.findMany({
        where: {
          userId: userId,
        },
        select: {
          roleName: true,
        },
      });
  
      return roles.map(role => role.roleName);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
  }
  