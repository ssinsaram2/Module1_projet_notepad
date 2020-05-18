package kr.co.team.service.theme;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupToMemberThemeDAO;
import kr.co.team.service.IService;

public class PrivateThemeService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		GroupToMemberThemeDAO groupToMemberThemeDAO = new GroupToMemberThemeDAO(); 
		
		String memberID=(String)request.getSession().getAttribute("MemberID");
		int code = Integer.parseInt(request.getParameter("memberCode"));//Ŭ���� ����ڵ�
		String themeName = (String)request.getParameter("theme"); //Ŭ���� �׸���
		int groupCode = Integer.parseInt(request.getParameter("groupCode")); //Ŭ���� �׷��ڵ�
		
		if(memberID != null) {
			int myCode=(int)request.getSession().getAttribute("MemberCode"); //ȸ���ڵ�
			if(myCode == code) { //�� ȸ���ڵ�� Ŭ���� ȸ���ڵ尡 ��ġ. �� ������ �����׸��� ������Ҷ�! �����Ԥ�
				request.setAttribute("isMine", "true");
				groupToMemberThemeDAO.delete(code, groupCode, themeName); 
			}
			else { //������ �׸��� ����°�. �Ұ���x
				request.setAttribute("isMine", "false");
			}
		}
		else {
			;
		}
	}
}
