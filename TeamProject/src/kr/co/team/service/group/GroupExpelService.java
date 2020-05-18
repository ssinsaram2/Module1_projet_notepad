package kr.co.team.service.group;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupDAO;
import kr.co.team.dao.GroupToMemberListDAO;
import kr.co.team.dao.GroupToMemberThemeDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;

public class GroupExpelService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		GroupToMemberThemeDAO groupToMemberThemeDAO = (GroupToMemberThemeDAO)DAOManager.getDAO("GroupToMemberThemeDAO");
		GroupToMemberListDAO groupToMemberListDAO = (GroupToMemberListDAO)DAOManager.getDAO("GroupToMemberListDAO");
		GroupDAO groupDAO = (GroupDAO)DAOManager.getDAO("GroupDAO");
		
		String memberID = (String)request.getSession().getAttribute("MemberID");
		boolean check = false;
		if(memberID != null) {
			int myCode = (int)request.getSession().getAttribute("MemberCode"); //���� �ڵ�
			int code = Integer.parseInt(request.getParameter("memberCode")); //Ŭ���� �̸��� ���� �ڵ�
			int groupCode = Integer.parseInt(request.getParameter("groupCode")); //�ش�Ǵ� �׷��ڵ�
			check = groupDAO.checkLeader(myCode, groupCode); //Ŭ���� ����� �������� üũ
			if(check == true) { //�߹��Ϸ��� ����� �׷����̸�
				if(myCode != code) {
					groupToMemberListDAO.delete(code, groupCode);
					groupToMemberThemeDAO.delete(code, groupCode);
					request.setAttribute("leaderCheck", "true");
					request.setAttribute("object", "other");
				}
				else {
					request.setAttribute("leaderCheck", "true");
					request.setAttribute("object", "me");
				}
			}
			else { //�߹��Ϸ��� ����� �Ϲ�ȸ���̸�
				request.setAttribute("leaderCheck", "false");
				request.setAttribute("object", null);
			}
		}
	}
}
