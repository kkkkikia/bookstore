package com.bookstore.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.domain.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;
	
	public List<Book> findAll() {
		List<Book> bookList = (List<Book>) bookRepository.findAll();
		
		List<Book> activeBookList = new ArrayList<>();
		
		for(Book book : bookList){
			if(book.isActive()){
				activeBookList.add(book);
			}
		}
		
		return activeBookList;
	}

	@Override
	public Book findOne(Long id) {
		// TODO Auto-generated method stub
		return bookRepository.findOne(id);
	}

	@Override
	public Book save(Book book) {
		// TODO Auto-generated method stub
		return bookRepository.save(book);
	}

	@Override
	public List<Book> blurrySearch(String keyword) {
		// TODO Auto-generated method stub
		List<Book> bookList = bookRepository.findByTitleContaining(keyword);
		
		List<Book> activeBookList = new ArrayList<>();
		
		for(Book book : bookList){
			if(book.isActive()){
				activeBookList.add(book);
			}
		}
		
		return activeBookList;
	}

	@Override
	public void removeOne(Long id) {
		// TODO Auto-generated method stub
		bookRepository.delete(id);
	}
}
