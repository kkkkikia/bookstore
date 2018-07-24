package com.bookstore.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.ShoppingCart;

@Transactional
public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Long>{

}
