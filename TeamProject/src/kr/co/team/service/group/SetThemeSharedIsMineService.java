package kr.co.team.service.group;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupToMemberThemeDAO;
import kr.co.team.dao.ThemeMemberDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;

public class SetThemeSharedIsMineService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//ThemeMemberDAO themeMemberDAO = (ThemeMemberDAO)DAOManager.getDAO("ThemeMemberDAO");
		//GroupToMemberThemeDAO groupToMemberThemeDAO = (GroupToMemberThemeDAO)DAOManager.getDAO("GroupToMemberThemeDAO");
		
		int myCode = (int)request.getSession().getAttribute("MemberCode");
		int code = Integer.parseInt(request.getParameter("memberCode"));
		//int groupCode = Integer.parseInt(request.getParameter("groupCode")); //�ش�Ǵ� �׷��ڵ�
		//boolean check = false;
		if(code == myCode) { //+Ŭ���� ���ſ��� �� ��쿡
			request.setAttribute("isMine", "true");
		}
		else { // ����ſ��� +��ư�� ������ ��쿡
			request.setAttribute("isMine", "false");
		}
	}
	
}
