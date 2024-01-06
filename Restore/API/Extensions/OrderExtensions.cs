using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectOrderToOrderDTO(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDTO{
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems
                                    .Select(item => new OrderItemDTO{
                                        ProductId = item.ProductItemOrdered.ProductId,
                                        Name = item.ProductItemOrdered.Name,
                                        PictureUrl = item.ProductItemOrdered.PictureUrl,
                                        Price = item.Price,
                                        Quantity = item.Quantity,
                                    }).ToList()
                }).AsNoTracking(); //No need to track the entity, we just want to GET it, this solved the Internal Server Error
        }
    }
}