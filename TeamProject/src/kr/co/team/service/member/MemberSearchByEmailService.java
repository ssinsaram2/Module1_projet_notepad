package kr.co.team.service.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.MemberDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.MemberVO;

public class MemberSearchByEmailService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		MemberDAO dao=(MemberDAO)DAOManager.getDAO("MemberDAO");
		if(request.getParameter("type").equals("findID")) {
			//email�� ���� ���̵�ã��
			String email = request.getParameter("findemail");
			
			MemberVO member = new MemberVO();
			member.setEmail(email);
			MemberVO memberVO = dao.findIDByEmail(member);
			
			if(memberVO != null) { // �̸��̷� �ش��ϴ� ���̵� ã������
				request.setAttribute("findIDByEmail", "success");
				String findid = memberVO.getId();
				request.setAttribute("find", findid);
				//System.out.println(findid);
				
			}
			else { //�̸��Ͽ��ش��ϴ� ���̵� ��ã������
				request.setAttribute("findIDByEmail", "fail");
			}
		}
		
	}
}
