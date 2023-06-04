package com.example.demo.data_transfer.mapper;

import com.example.demo.data_transfer.objects.Dto;
import com.example.demo.model.entity.Model;
import java.util.List;

public abstract class Mapper {
    public abstract Model mapDtoToModel(Dto dto);
    public abstract Dto mapModelToDto(Model model);
    public abstract List<Dto> mapModelsToDtos(List<Model> models);
    public abstract List<Model> mapDtosToModels(List<Dto> dtos);
}
