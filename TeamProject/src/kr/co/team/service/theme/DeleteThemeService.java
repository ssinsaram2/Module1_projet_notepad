package kr.co.team.service.theme;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.team.dao.GroupToMemberThemeDAO;
import kr.co.team.dao.NotepadDAO;
import kr.co.team.dao.ThemeMemberDAO;
import kr.co.team.listener.DAOManager;
import kr.co.team.service.IService;
import kr.co.team.vo.GroupToMemberThemeVO;
import kr.co.team.vo.NotepadVO;
import kr.co.team.vo.ThemeMemberVO;

public class DeleteThemeService implements IService {
	@Override
	public void doService(HttpServletRequest request, HttpServletResponse response) throws Exception{
		NotepadDAO notepadDAO=(NotepadDAO)DAOManager.getDAO("NotepadDAO");
		ThemeMemberDAO themeMemberDAO=(ThemeMemberDAO)DAOManager.getDAO("ThemeMemberDAO");
		GroupToMemberThemeDAO groupToMemberThemeDAO=(GroupToMemberThemeDAO)DAOManager.getDAO("GroupToMemberThemeDAO");
		
		NotepadVO notepadVO=new NotepadVO();
		ThemeMemberVO themeMemberVO=new ThemeMemberVO();
		GroupToMemberThemeVO groupToMemberThemeVO = new GroupToMemberThemeVO();
		
		String memberID=(String)request.getSession().getAttribute("MemberID");
		
		if(memberID != null) {
			int code=(int)request.getSession().getAttribute("MemberCode"); //ȸ���ڵ�
			String theme = (String)request.getParameter("theme"); //front���� theme�ޱ�!!
			themeMemberVO.setMember_code(code);
			themeMemberVO.setThemeMember_name(theme);
			themeMemberDAO.delete(themeMemberVO);
			
			request.setAttribute("themeDelete", "1"); //������ 1������
		}
		else {
			request.setAttribute("themeDelete", "0"); //���н� 0������
		}
	}
}
