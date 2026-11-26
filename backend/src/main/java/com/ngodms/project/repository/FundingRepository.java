package com.ngodms.project.repository;

import com.ngodms.project.model.Funding;
import com.ngodms.project.model.Project;
import com.ngodms.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundingRepository extends JpaRepository<Funding, Long> {
    List<Funding> findByProjectOrderByFundingDateDesc(Project project);
    List<Funding> findByFunderOrderByFundingDateDesc(User funder);
}
