package kr.co.team.service.group;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupDAO;
import kr.co.team.dao.GroupToMemberListDAO;
import kr.co.team.dao.GroupToMemberThemeDAO;
import kr.co.team.dao.ThemeMemberDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.GroupVO;

public class WithdrawGroupService implements IService {
	
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
//		ThemeMemberDAO themeMemberDAO = (ThemeMemberDAO)DAOManager.getDAO("ThemeMemberDAO");
		GroupToMemberThemeDAO groupToMemberThemeDAO = (GroupToMemberThemeDAO)DAOManager.getDAO("GroupToMemberThemeDAO");
		GroupToMemberListDAO groupToMemberListDAO = (GroupToMemberListDAO)DAOManager.getDAO("GroupToMemberListDAO");
		GroupDAO groupDAO = (GroupDAO)DAOManager.getDAO("GroupDAO");
//		ThemeMemberVO themeMemberVO = new ThemeMemberVO();
//		GroupToMemberThemeVO groupToMemberThemeVO = new GroupToMemberThemeVO();
//		GroupToMemberListVO groupToMemberListVO = new GroupToMemberListVO();
		
		String memberID=(String)request.getSession().getAttribute("MemberID");
		boolean check = false;
		int count = 0;
		if(memberID != null) {
			int code = (int)request.getSession().getAttribute("MemberCode"); //�α��ν� ���ǿ� ����Ǿ��ִ� ����ڵ� 
			int groupCode = Integer.parseInt(request.getParameter("groupCode")); //ajax���� �ޱ�!! ���ܳ��� �׷��ڵ�
			check = groupDAO.checkLeader(code, groupCode);
			count = groupToMemberListDAO.countList(groupCode);
			if(check == true) { //���������ϴ� ����� �׷����̸�
				if(count > 1) { // �� �̿ܿ� �ٸ������ ����������
					request.setAttribute("leaderCheck", "true"); //�׷츮���̴�true
				}
				else { // �� ȥ�ڸ� ����������
					groupToMemberListDAO.delete(code, groupCode);
					groupToMemberThemeDAO.delete(code, groupCode);
					groupDAO.delete(groupCode);
					request.setAttribute("leaderCheck", "trueAlone");
				}
			}
			else { //�������� ����� �Ϲ�ȸ���̸�
				groupToMemberListDAO.delete(code, groupCode); //����Ʈ���� ����
				groupToMemberThemeDAO.delete(code, groupCode); //�׷�toȸ���׸����� ����
				request.setAttribute("leaderCheck", "false"); // �Ϲ� ȸ���̹Ƿ� ���� ���̺� �� �����ϰ� ������ �ƴ϶�°� attribute�� ����
			}
		}
		else {
			;
		}
	}
}
