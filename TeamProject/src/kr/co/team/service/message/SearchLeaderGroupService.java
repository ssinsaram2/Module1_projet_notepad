package kr.co.team.service.message;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.GroupVO;

public class SearchLeaderGroupService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		GroupDAO groupDAO = (GroupDAO)DAOManager.getDAO("GroupDAO");
		
		String groupName = (String)request.getParameter("groupName");
		String memberID =(String)request.getSession().getAttribute("MemberID");
		int code =  (int)request.getSession().getAttribute("MemberCode"); //�α��ν� ���ǿ� ����Ǿ��ִ� ����ڵ� 
		boolean result = false;
		
		result = groupDAO.searchLeader(groupName, code);
		
		if(result == true) { //���� �׷����� �׷쿡 �ش� �׷��� �����ϸ�
			request.setAttribute("isExist", "yes");
		}
		else { //�� �׷쿡 �׷��׷��� ���ٸ�
			request.setAttribute("isExist", "no");
		}
		
	}
}
