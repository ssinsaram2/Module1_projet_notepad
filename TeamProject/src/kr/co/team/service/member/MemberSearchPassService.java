package kr.co.team.service.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.MemberDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.MemberVO;

public class MemberSearchPassService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		MemberDAO dao=(MemberDAO)DAOManager.getDAO("MemberDAO");
		String type = request.getParameter("type");
		System.out.println(type);
		if(request.getParameter("type").equals("findPass")) {
			System.out.println(1);
			String id = request.getParameter("findID");
			String email = request.getParameter("findEmail");
			MemberVO member = new MemberVO();
			member.setId(id);
			member.setEmail(email);
			MemberVO memberVO = dao.findPass(member);
			if(memberVO != null) { //�ش� ��й�ȣ�� ������
				request.setAttribute("findPass", "success"); //����
				String findPass = memberVO.getPass(); //ã�� �н�����
				System.out.println(findPass);
				request.setAttribute("find", findPass); 
			}
			else { // ���̵� ���Ϲ�ȣ�� �߸��Ǿ� �ش� ��й�ȣ�� ������
				request.setAttribute("findIDByEmail", "fail");
			}
		}
	}
}
